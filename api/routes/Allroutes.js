/* eslint-disable no-console */
import express from 'express';
import userRoute from './auth';
import articleRoute from './articles';
import commentRoute from './commentArticle';
import adminRoute from './admin';

const router = express.Router();
router.use(express.json());

router.use(userRoute);
router.use(articleRoute);
router.use(commentRoute);
router.use(adminRoute);

export default router;
