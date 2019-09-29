import bcrypt from 'bcrypt';
import ENV from 'dotenv';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import validateUserSignUp from '../middleware/validateUser';

ENV.config();

class UserController {
  // create user account

  static async signUp(req, res) {
    const { error } = validateUserSignUp(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const email = users.find((user) => user.email === req.body.email);
    if (email) {
      return res.status(401).json({
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
    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
        token,
        newUser,
      },
    });
  }

  // login a user successfully

  static async loginUser(req, res) {
    const checkEmail = users.find((user) => user.email === req.body.email);
    if (!checkEmail) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email or password',
      });
    }

    const validPassword = await bcrypt.compare(req.body.password, checkEmail.password);
    if (!validPassword) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email or password',
      });
    }

    const signinPayLoad = {
      email: checkEmail.email,
      password: checkEmail.password,
    };

    const token = jwt.sign(signinPayLoad, process.env.JWT_KEY);
    return res.status(200).json({
      status: 200,
      message: 'User is successfuly logged in',
      data: token,
    });
  }
}

export default UserController;
