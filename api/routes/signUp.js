import express from 'express';
import signup from '../controllers/signup';

const router = express();

router.post('/', signup);

export default router;
