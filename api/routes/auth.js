import express from 'express';
import authentication from '../controllers/userController';

const userRoute = express.Router();

userRoute.post('/signup', authentication.signUp);
userRoute.post('/signin', authentication.loginUser);

export default userRoute;
