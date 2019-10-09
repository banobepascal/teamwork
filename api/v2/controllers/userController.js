/**
* eslint-disable no-multi-assign
* eslint-disable consistent-return
* eslint-disable no-use-before-define
* eslint-disable no-undef
* eslint-disable padded-blocks
*/

import uuidv4 from 'uuidv4';
import _ from 'lodash';
import Helpers from '../helpers/validInputs';
import client from '../helpers/dbConnection';


class UserController {
  /**
   * @method signUp
   * @description registers a user to the database with valid fields
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JWT token
   */

  static async signUp(req, res) {
    const data = _.pick(req.body, [
      'firstname', 'lastname', 'email', 'password', 'gender',
      'jobrole', 'department', 'address', 'isAdmin',
    ]);

    const hashpassword = Helpers.hashPassword(data.password);

    const query = `INSERT INTO users(id, firstName, lastName,
         email, password, gender, jobRole, department, address, isAdmin)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    const values = [uuidv4(), data.firstname, data.lastname, data.email, hashpassword,
      data.gender, data.jobrole, data.department, data.address, data.isAdmin];

    try {
      const { rows } = await client.query(query, values);
      const token = Helpers.generateToken(rows[0].id);

      return res.status(201).send({
        status: 201,
        message: 'user created successfully',
        data: {
          token,
        },
      });
    } catch (error) {
      if (error.constraint === 'users_email_key') {
        return res.status(409).json({
          status: 409,
          error: 'email already exist, please choose another email',
        });
      }
      return res.status(500).json({
        status: 500,
        error: 'an internal error occurred at the server',
      });
    }
  }

  /**
   * @method loginUser
   * @description sigins in a valid user into the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JWT token
   */

  static async loginUser(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await client.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          message: 'invalid email or password',
        });
      }
      if (!Helpers.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
          status: 400,
          message: 'invalid email or password',
        });
      }
      const token = Helpers.generateToken(rows[0].id);
      return res.status(200).send({
        status: 200,
        message: 'user is successfuly logged in',
        data: {
          token,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default UserController;
