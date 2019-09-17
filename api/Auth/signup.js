/* eslint-disable consistent-return */
import express from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import User from '../models/userSignUp';
import validateUserSignUp from '../validation/validateUser';

const signup = express.Router();
signup.use(express.json());

signup.post('/', async (req, res) => {
  const { error } = validateUserSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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

  const token = jwt.sign({ email: User.email }, 'secretKey');
  User.push(newUser);
  res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: token,
  });
});

export default signup;
