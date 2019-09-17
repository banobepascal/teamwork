import express from 'express';
import jwt from 'jsonwebtoken';
import user from '../models/userSignUp';

const signup = express.Router();
signup.use(express.json());

signup.post('/', (req, res) => {
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    jobRole: req.body.jobRole,
    department: req.body.department,
    address: req.body.address,
  };

  user.push(newUser);
  res.status(200).json({
    status: 200,
    message: 'User created successfully',
    data: newUser,
  });
});

export default signup;
