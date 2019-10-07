/* eslint-disable no-console */
import express from 'express';

const httpErrors = express.Router();
httpErrors.use(express.json());

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
