/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcrypt';
import validateUser from '../helpers/validateSignIn';
import users from '../migrations/users';


const signin = express.Router();

signin.use(express.json());

signin.get('/', async (req, res) => {
  // const salt = await bcrypt.genSalt(10);
  // users.password = await bcrypt.hash(users.password, salt);

  res.status(200).json({
    status: 200,
    data: users,
  });
});

signin.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const checkEmail = await users.find((user) => user.email === req.body.email);
  if (!checkEmail) {
    res.status(404).json({
      status: 404,
      error: 'Invalid email or password',
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, checkEmail.password);
  if (!validPassword) {
    res.status(404).json({
      status: 404,
      error: 'Invalid email or password',
    });
  }

  const signinPayLoad = {
    firstname: checkEmail.firstname,
    lastname: checkEmail.lastname,
    email: checkEmail.email,
    password: checkEmail.password,
  };

  const token = jwt.sign({ signinPayLoad }, 'secretkey');
  res.status(200).json({
    status: 200,
    message: 'User is successfuly logged in',
    data: token,
  });
});

export default signin;
