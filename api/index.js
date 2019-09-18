/* eslint-disable no-console */
import express from 'express';
import signin from './Auth/signin';
import signup from './Auth/signup';
import articlePost from './controllers/articles';
import auth from './middleware/auth';

const app = express();
app.use(express.json());

app.use('/api/v1/auth/signup', signup);
app.use('/api/v1/auth/signin', signin);
app.use('/api/v1/articles', auth, articlePost);

export default app;
