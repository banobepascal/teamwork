import express from 'express';
import router from './Auth/signup';

const app = express();
app.use(express.json());

app.use('/api/v1/auth/signup', router);

export default app;
