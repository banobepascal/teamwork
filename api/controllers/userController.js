/* eslint-disable padded-blocks */
import bcrypt from 'bcrypt';
import ENV from 'dotenv';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import validation from '../middleware/validation';

ENV.config();

class UserController {
  // create user account
  static async signUp(req, res) {
    const { error } = validation.validateUserSignUp(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/[/"]/g, ''),
      });
    }

    const email = users.find((user) => user.email === req.body.email);
    if (email) {
      return res.status(409).json({
        status: 409,
        error: 'email already exist',
      });
    }

    const newUser = _.pick(req.body, [
      'firstname',
      'lastname',
      'email',
      'password',
      'confirmPassword',
      'gender',
      'jobRole',
      'department',
      'address',
    ]);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const signUpPayload = _.pick(req.body, [
      'id',
      'firstname',
      'email',
      'gender',
      'isAdmin',
    ]);

    const genToken = jwt.sign(signUpPayload, process.env.JWT_KEY);
    users.push(newUser);
    return res.status(201).json({
      status: 201,
      message: 'user created successfully',
      data: {
        token: genToken,
      },
    });
  }

  // login a user successfully
  static async loginUser(req, res) {
    const checkEmail = users.find((user) => user.email === req.body.email);
    if (!checkEmail) {
      return res.status(400).json({
        status: 400,
        error: 'wrong email or password',
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      checkEmail.password,
    );
    if (!validPassword) {
      return res.status(400).json({
        status: 400,
        error: 'wrong email or password',
      });
    }

    const signinPayLoad = {
      email: checkEmail.email,
      password: checkEmail.password,
      isAdmin: checkEmail.isAdmin,
    };

    const gentoken = jwt.sign(signinPayLoad, process.env.JWT_KEY);
    return res.status(200).json({
      status: 200,
      message: 'user is successfuly logged in',
      data: {
        token: gentoken,
      },
    });
  }
}

export default UserController;
