import express from 'express';
import admin from '../controllers/adminController';
import adminAuth from '../../middleware/admin';
import validation from '../../middleware/validation';

const adminRoute = express.Router();

adminRoute.delete(
  '/api/v1/flagged/articles/:id',
  [validation.checkToken, adminAuth],
  admin.deleteFlagged,
);

export default adminRoute;
