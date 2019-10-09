import express from 'express';
import authentication from '../controllers/userController';
import Helpers from '../helpers/validInputs';

const userRoute = express.Router();

userRoute.post(
  '/api/v2/auth/signup',
  Helpers.authRules,
  authentication.signUp,
);
userRoute.post('/api/v2/auth/signin', authentication.loginUser);

export default userRoute;
