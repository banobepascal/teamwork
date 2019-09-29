import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from 'dotenv';

ENV.config();

exports.hashpassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hashSync(password, salt);
};

exports.generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_KEY);
  return token;
};
