import { Router } from 'express';
import { register, login } from '../controllers/authController';
// import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
// router.get('/protected', authMiddleware, (req, res) => {
//   res.send('You are authenticated!');
// });

export default router;
