import express from 'express';
import user from '../models/data';

const app = express();
app.use(express.json());

app.post('/api/v1/auth/signup', (req, res) => {
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    jobRole: req.body.jobRole,
    department: req.body.department,
    address: req.body.address,
  };

  user.push(newUser);
  res.status(200).json({
    status: 200,
    message: 'User created successfully',
    data: newUser,
  });
});

export default app;
