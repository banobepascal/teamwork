import express from 'express';
import signin from '../controllers/signin';

const router = express();
router.use(express.json());

router.post('/', signin);

export default router;
