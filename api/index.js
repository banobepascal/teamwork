/* eslint-disable no-console */
import express from 'express';
import winston from 'winston';
import userRoute from './routes/auth';
import articleRoute from './routes/articles';
import commentRoute from './routes/commentArticle';
import auth from './middleware/auth';

const app = express();
app.use(express.json());

process.on('unhandledRejection', (ex) => {
  console.log('WE GOT AN UNHANDLED REJECTION');
  winston.error(ex.message, ex);
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

app.use('/api/v1/auth/', userRoute);
app.use('/api/v1/', auth, articleRoute);
app.use('/api/v1/', auth, commentRoute);

require('../api/helpers/prod')(app);

export default app;
