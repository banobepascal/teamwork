import express from 'express';
import authentication from '../controllers/userController';

const userRoute = express.Router();

userRoute.post('/api/v1/auth/signup', authentication.signUp);
userRoute.post('/api/v1/auth/signin', authentication.loginUser);

export default userRoute;
