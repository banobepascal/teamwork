/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import express from 'express';
import winston from 'winston';
import endPoints from './routes/Allroutes';

const app = express();
app.use(express.json());

process.on('unhandledRejection', (ex) => {
  winston.error(ex.message, ex);
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

// route for all routes
app.use(endPoints);

// handling invalid route parameters
app.use('/*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'invalid route, please check your route',
  });
});

// verifying json data sent for errors in input
app.use((error, req, res, next) => {
  if (error.status === 400) {
    res.status(error.status || 500);
    res.json({
      error: 'you have entered bad json data, please check your input',
    });
  } else {
    res.status(error.status || 500);
    res.json({
      error: 'internal server error, please restart your server',
    });
  }
});

require('../api/middleware/prod')(app);

export default app;
