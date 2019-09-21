/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import ENV from 'dotenv';
import bcrypt from 'bcrypt';
import users from '../models/users';

ENV.config();

const signin = ('/', async (req, res) => {
  const checkEmail = users.find((user) => user.email === req.body.email);
  if (!checkEmail) {
    res.status(400).json({
      status: 400,
      error: 'Invalid email or password',
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, checkEmail.password);
  if (!validPassword) {
    res.status(400).json({
      status: 400,
      error: 'Invalid email or password',
    });
  }

  const signinPayLoad = {
    email: checkEmail.email,
    password: checkEmail.password,
  };

  const token = jwt.sign(signinPayLoad, process.env.JWT_KEY);
  res.status(200).json({
    status: 200,
    message: 'User is successfuly logged in',
    data: token,
  });
});

export default signin;
