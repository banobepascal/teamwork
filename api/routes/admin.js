import express from 'express';
import admin from '../controllers/adminController';
import authToken from '../middleware/checkToken';
import adminAuth from '../middleware/admin';

const adminRoute = express.Router();

// adminRoute.get('/api/v1/flagged/articles', [authToken, adminAuth], admin.viewFlagged);
adminRoute.delete('/api/v1/flagged/articles/:id', [authToken, adminAuth], admin.deleteFlagged);

export default adminRoute;
