import {Router} from 'express';
const router = Router();
import { getpaymentAPIKey,buySubscription,verifySubscription,cancelSubscription,allPayments } from '../controllers/payment.controller.js'
import { isloggedIn,authorizedRoles } from "../middleware/auth.middleware.js";

router.route('/payment-key')
.get(getpaymentAPIKey);


router.route('/subscribe')
.post(isloggedIn,buySubscription)


router.route('/verify')
.post(isloggedIn,verifySubscription)

router.route('/unsubscribe')
.post(isloggedIn,cancelSubscription)

router.route('/')
.get(isloggedIn,    authorizedRoles('ADMIN'),
allPayments);


export default router;
