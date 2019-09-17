/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-console */
import express from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import Joi from 'joi';
import users from '../migrations/users';


const signin = express.Router();

signin.use(express.json());

signin.post('/api/v1/auth/signup', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send('Invalid email or password');
  
  const salt = await bcrypt.genSalt(10);
  loginUser.password = await bcrypt.hash(loginUser.password, salt);

  res.status(200).json({
    status: 200,
    message: 'Success',
    data: token,
  });
});

const validate = (user) => {
  const schema = {
      email: Joi.string().min(5).required(),
      password: Joi.string().min(8).required(),
  };

  return Joi.validate(user, schema);
};

module.exports = app;
