import express from 'express';
import viewArticles from '../controllers/viewArticles';

const router = express();

router.get('/', viewArticles);


export default router;
