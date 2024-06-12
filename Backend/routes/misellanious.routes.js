import { Router } from 'express';
import {
  contactUs,
  userStats,
} from '../controllers/misellanious.controller.js';
import { authorizedRoles, isloggedIn } from '../middleware/auth.middleware.js';

const router = Router();


router.post('/contact',contactUs);
router
  .route('/admin/stats/users')
  .get(isloggedIn, authorizedRoles('ADMIN'), userStats);

export default router;