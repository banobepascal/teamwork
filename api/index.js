/* eslint-disable no-console */
import express from 'express';
import winston from 'winston';
import signin from './routes/signIn';
import signup from './routes/signUp';
import articlePost from './controllers/postArticle';
import editArticle from './controllers/editArticle';
import deleteArticle from './controllers/deleteArticle';
import comentArticle from './controllers/comentArticle';
import viewArticles from './controllers/viewArticles';
import viewSpecific from './controllers/specificArticle';
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
app.use('/api/v1/articles', auth, articlePost);
app.use('/api/v1/articles', auth, editArticle);
app.use('/api/v1/articles', auth, deleteArticle);
app.use('/api/v1/articles', auth, comentArticle);
app.use('/api/v1/feeds', auth, viewArticles);
app.use('/api/v1/articles', auth, viewSpecific);

export default app;
