/* eslint-disable no-console */
import express from 'express';
import winston from 'winston';
import signin from './routes/signIn';
import signup from './routes/signUp';
import articles from './routes/articles';
import viewFeeds from './routes/viewFeed';
import auth from './middleware/auth';

const app = express();
app.use(express.json());

process.on('unhandledRejection', (ex) => {
  console.log('WE GOT AN UNHANDLED REJECTION');
  winston.error(ex.message, ex);
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

app.use('/api/v1/auth/signup', signup);
app.use('/api/v1/auth/signin', signin);
app.use('/api/v1/feeds', auth, viewFeeds);
app.use('/api/v1/articles', auth, articles);

require('../api/helpers/prod')(app);

export default app;
