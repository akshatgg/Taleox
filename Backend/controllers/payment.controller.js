import apperror from "../utils/error.util.js";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
// import Razorpay from 'razorpay';


const getpaymentAPIKey=async(req,res,next)=>{
    
    
    res.status(200).json({
        success: true,
        message: "API key",
        key:process.env.RAZORPAY_API_ID
    });
}


const buySubscription=async(req,res,next)=>{
    const {id}=req.user;

    const user=await User.findById(id);

    if(!user){
        return next(new apperror('Unauthorized, please login', 400));

    }


    if(user.role == 'ADMIN'){
        return next(new apperror('ADMIN cannot purchase a subscription', 400));

    }

    const subscription =await razorpay.subscription.create({

        plan_id:process.env.RAZORPAY_PLAN_ID,
        customer_notify: 1

    })

    user.subscription.id=subscription.id;
    user.subscription.status=subscription.status


    await user.save();

    res.status(200).json({
        success: true,
        message: "subscribe suceessfully",
        subscription_id:subscription.id
      
    });

}


const verifySubscription=async(req,res,next)=>{
  const {id}= req.user;
  const{payment_id ,PushSubscription_id, signature_id} =req.body;
    
  const user=await User.findById(id);

  if(!user){
      return next(new apperror('Unauthorized, please login', 400));

  }

  const subscriptionId=user.subscription.id;

const generateSignature= crypto
.createHmac('sha256',process.env.RAZORPAY_SECRET)
.update(`${payment_id}|${subscriptionId}`)
.digest('hex');

if(generateSignature !== signature_id){
    return next(new apperror('payment not happend verifr agauin', 400));

}


const cancelSubscription=async(req,res,next)=>{

}

const allPayments=async(req,res,next)=>{

}



export {getpaymentAPIKey,buySubscription,verifySubscription,cancelSubscription,allPayments}