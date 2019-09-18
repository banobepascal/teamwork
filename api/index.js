import express from 'express';
import signin from './Auth/signin';
import signup from './Auth/signup';

const app = express();
app.use(express.json());

app.use('/api/v1/auth/signup', signup);
app.use('/api/v1/auth/signin', signin);

export default app;
