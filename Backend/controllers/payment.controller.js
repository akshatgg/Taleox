import apperror from "../utils/error.util.js";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import razorpay from '../index.js';
import crypto from 'crypto';

const getpaymentAPIKey = async (req, res, next) => {

    res.status(200).json({
        success: true,
        message: "API key",
        key: process.env.RAZORPAY_API_ID
    });

}


const buySubscription = async (req, res, next) => {

    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
        return next(new apperror('Unauthorized, please login', 400));
    }


    if(user.role == 'ADMIN'){
        return next(new apperror('ADMIN cannot purchase a subscription', 400));
    }

try{
    const subscription =  razorpay.subscriptions.create({

        plan_id: process.env.RAZORPAY_PLAN_ID,
        customer_notify: 1

    })

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status

    await user.save();



    res.status(200).json({
        success: true,
        message: "subscribe suceessfully",
        subscription_id: subscription.id
    });
}
catch (error) {
    console.error("Error creating subscription:", error);
    return next(new apperror('Error creating subscription', 500));
}

}





const verifySubscription = async (req, res, next) => {
    const { id } = req.user;
    const { payment_id, PushSubscription_id, signature_id } = req.body;

    const user = await User.findById(id);

    if (!user) {
        return next(new apperror('Unauthorized, please login', 400));
    }


    const subscriptionId = user.subscription.id;

    const generateSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(`${payment_id}|${subscriptionId}`)
        .digest('hex');

    if (generateSignature !== signature_id) {
        return next(new apperror('payment not happend verified agauin', 400));

    }
    await Payment.create({
        payment_id,
        signature_id,
        PushSubscription_id

    })
    user.subscription.status = 'active';
    await user.save();



    res.status(200).json({
        success: true,
        message: "payment verify sucessfully",


    });
}




const cancelSubscription = async (req, res, next) => {
    const { id } = req.user;

    const user = await User.findById(id);
    if (user.role == 'ADMIN') {
        return next(new apperror('ADMIN cannot purchase a subscription', 400));
    }


    if (!user) {
        return next(new apperror('Unauthorized, please login', 400));
    }
    const subscriptionId = user.subscription.id;

    const subscription = razorpay.subscriptions.cancel(

        subscriptionId
    )

    user.subscription.status = subscription.status
    await user.save();


    res.status(200).json({
        success: true,
        message: "subscription cancel",


    });

}





const allPayments = async (req, res, next) => {

    try {

        const { count } = req.query;

        const subscriptions = await razorpay.subscriptions.all({
            count: count || 10,
        })

        res.status(200).json({
            success: true,
            message: "All payments",
            subscriptions

        });
    }
    catch (e) {
        return next(new apperror(e.message, 500));

    }




    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const finalMonths = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
    };
    
    const monthlyWisePayments = allPayments.items.map((payment) => {
        // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
        const monthsInNumbers = new Date(payment.start_at * 1000);

        return monthNames[monthsInNumbers.getMonth()];
    });

    monthlyWisePayments.map((month) => {
        Object.keys(finalMonths).forEach((objMonth) => {
            if (month === objMonth) {
                finalMonths[month] += 1;
            }
        });
    });

    const monthlySalesRecord = [];

    Object.keys(finalMonths).forEach((monthName) => {
        monthlySalesRecord.push(finalMonths[monthName]);
    });

    res.status(200).json({
        success: true,
        message: 'All payments',
        allPayments,
        finalMonths,
        monthlySalesRecord,
    });


}

export { getpaymentAPIKey, buySubscription, verifySubscription, cancelSubscription, allPayments }