/* eslint-disable no-console */
import express from 'express';
import winston from 'winston';
import userRoute from './routes/auth';
import articleRoute from './routes/articles';
import commentRoute from './routes/commentArticle';

const app = express();
app.use(express.json());

process.on('unhandledRejection', (ex) => {
  console.log('WE GOT AN UNHANDLED REJECTION');
  winston.error(ex.message, ex);
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

app.use(userRoute);
app.use(articleRoute);
app.use(commentRoute);

require('../api/middleware/prod')(app);

export default app;
