import jwt from 'jsonwebtoken';
import ENV from 'dotenv';

ENV.config();

const checkToken = (req, res, next) => {
  const token = req.header('authorization');
  if (!token) {
    res.status(401).json({
      status: 401,
      message: 'please provide token',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).json({
      status: 401,
      message: 'unauthorised to use this resource, please signup/login',
    });
  }
};

export default checkToken;
