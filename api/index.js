import express from 'express';

import signup from './Auth/signup';

const app = express();
app.use(express.json());

app.use('/api/v1/auth/signup', signup);

export default app;
