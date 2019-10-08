import express from 'express';
import authentication from '../controllers/userController';
import rules from '../middleware/validInputs';

const userRoute = express.Router();

userRoute.post(
  '/api/v2/auth/signup',
  rules.authRules,
  authentication.signUp,
);
userRoute.post('/api/v2/auth/signin', authentication.loginUser);

export default userRoute;
