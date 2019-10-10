/* eslint-disable no-console */
import express from 'express';
import userRoute from './auth';
import articleRoute from './articles';

const router = express.Router();
router.use(express.json());

router.use(userRoute);
router.use(articleRoute);

export default router;
