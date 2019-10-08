/* eslint-disable no-multi-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable padded-blocks */
import bcrypt from 'bcrypt';
import ENV from 'dotenv';
import jwt from 'jsonwebtoken';
// import uuidv4 from 'uuidv4';
import _ from 'lodash';
import client from '../helpers/dbConnection';

ENV.config();

class UserController {
  // create user account
  static async signUp(req, res) {

    const data = _.pick(req.body, [
      'firstname', 'lastname', 'email', 'password', 'gender',
      'jobrole', 'department', 'address', 'isAdmin',
    ]);

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const query = `INSERT INTO users(firstName, lastName,
         email, password, gender, jobRole, department, address, isAdmin)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    const values = [data.firstname, data.lastname, data.email, data.password,
      data.gender, data.jobrole, data.department, data.address, data.isAdmin];

    try {
      const results = await client.query(query, values);
      const signUpPayload = _.pick(req.body, [
        'id', 'firstname', 'email', 'isAdmin',
      ]);

      const genToken = jwt.sign(signUpPayload, process.env.JWT_KEY, { expiresIn: '4h' });
      return res.status(201).send({
        status: 201,
        message: 'user created successfully',
        data: {
          token: genToken,
          results: results.rows[0],
        },
      });
    } catch (error) {
      if (error.constraint === 'users_email_key') {
        return res.status(409).json({
          status: 409,
          error: 'email already exist, please choose another email',
        });
      }
      res.status(500).json({
        status: 500,
        error: 'an internal error occurred at the server',
      });
    }
  }

  // login a user successfully
  static async loginUser(req, res) {
    const { email } = req.body.email;
    const authQuery = `SELECT * FROM users WHERE email = ${email}`;

    try {
      await client.query(authQuery, (error, result) => {
        if (result.rows < '1') {
          res.status(404).send({
            status: 404,
            error: 'invalid email or password',
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: 'user successfully logged in',
            data: {
              results: result.rows,
            },
          });
        }
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: 'an internal error occurred at the server',
        });
      }
    }
    
    try {
      const checkEmail = await client.query(authQuery);
      const signinPayLoad = {
        email: checkEmail.email,
        password: checkEmail.password,
        isadmin: checkEmail.isadmin,
      };

      const gentoken = jwt.sign(signinPayLoad, process.env.JWT_KEY);
      return res.status(200).send({
        status: 200,
        message: 'user is successfuly logged in',
        data: {
          token: gentoken,
        },
      });
    } catch (error) {
      if (!checkEmail.rowCount > 0) {
        return res.status(400).json({
          status: 400,
          error: 'invalid email or password',
        });
      } if (!validPassword) {
        return res.status(400).json({
          status: 400,
          error: 'invalid email or password',
        });
      }
    }
  }
}

export default UserController;
