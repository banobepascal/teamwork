import jwt from 'jsonwebtoken';
import ENV from 'dotenv';

ENV.config();

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({
      status: 401,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({
      status: 400,
      message: 'Invalid token.',
    });
  }
};

export default auth;
