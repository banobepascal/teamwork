/* eslint-disable no-console */
import express from 'express';

const httpErrors = express.Router();
httpErrors.use(express.json());

/**
   * @method httpErrors
   * @description these handle http or links sent by the user wether true or false
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} relevant error message
   */

httpErrors.put('/*', (req, res) => {
  res.status(405).json({
    status: 405,
    error: 'method not allowed',
  });
});

// handling invalid route parameters
httpErrors.use('/*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'invalid route, please check your route',
  });
});

export default httpErrors;
