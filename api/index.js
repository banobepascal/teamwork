/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import express from 'express';
import winston from 'winston';
import endPoints from './routes/Allroutes';
import httpErrors from './routes/httpErrors';

const app = express();
app.use(express.json());

process.on('unhandledRejection', (ex) => {
  winston.error(ex.message, ex);
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

// route for all routes
app.use(endPoints);
app.use(httpErrors);


// verifying json data sent for errors in input
app.use((error, req, res, next) => {
  if (error.status === 400) {
    res.status(400).json({
      error: 'you have entered bad json data, please check your input',
    });
  }
});

require('../api/middleware/prod')(app);

export default app;
