/* eslint-disable consistent-return */
import express from 'express';
import bcrypt from 'bcrypt';
import ENV from 'dotenv';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import validateUserSignUp from '../helpers/validateUser';

const signup = express.Router();
signup.use(express.json());
ENV.config();

signup.post('/', async (req, res) => {
  const { error } = validateUserSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const email = users.find((user) => user.email === req.body.email);
  if (email) {
    res.status(401).json({
      status: 401,
      error: 'Email already exist',
    });
  }

  const newUser = _.pick(req.body, [
    'firstname',
    'lastname',
    'email',
    'password',
    'gender',
    'jobRole',
    'department',
    'address',
  ]);
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const signUpPayload = _.pick(req.body, [
    'email',
    'password',
    'gender',
  ]);
           
  const token = jwt.sign(signUpPayload, process.env.JWT_KEY);
  users.push(newUser);
  res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: {
      token,
      newUser,
    },
  });
});

export default signup;
