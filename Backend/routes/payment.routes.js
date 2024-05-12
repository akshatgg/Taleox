import {Router} from 'express';
const router = Router();


router.route('/payment-key')
.get(getpaymentAPIKey);


router.route('/subscribe')
.post(buySubscription)

router.route('/verify')
.post(verifySubscription)

router.route('/unsubscribe')
.post(cancelSubscription)

router.route('/')
.get(allPayments);


export default router;
