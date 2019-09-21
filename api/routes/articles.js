import express from 'express';
import articlePost from '../controllers/postArticle';
import editArticle from '../controllers/editArticle';
import deleteArticle from '../controllers/deleteArticle';
import comentArticle from '../controllers/comentArticle';
import viewSpecific from '../controllers/specificArticle';

const router = express();

router.get('/:id', viewSpecific);
router.post('/:id/comments', comentArticle);
router.post('/', articlePost);
router.patch('/:id', editArticle);
router.delete('/:id', deleteArticle);

export default router;
