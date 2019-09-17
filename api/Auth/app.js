/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-console */
import express from 'express';
import user from '../models/data';

const app = express();

app.use(express.json());

app.get('/people', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Success',
    data: people,
  });
});

app.get('/people/:id', (req, res) => {
  const person = people.find((p) => p.id === parseInt(req.params.id));

  if (!person) {
    return res.status(404).json({
      status: 404,
      message: 'person with id not availabe',
    });
  }

  return res.status(200).json({
    status: 200,
    message: 'Success',
    data: person,
  });
});

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
    message: 'Success',
    data: newUser,
  });
});

app.put('/people/:id', (req, res) => {
  const person = people.find((p) => p.id === parseInt(req.params.id));

  if (!person) {
    return res.status(404).json({
      status: 404,
      message: 'person with id not availabe',
    });
  }

  person.id = req.body.id;
  person.name = req.body.name;
  res.status(200).json({
    status: 200,
    message: 'Success',
    data: person,
  });
});

app.delete('/people/:id', (req, res) => {
  const person = people.find((p) => p.id === parseInt(req.params.id));

  if (!person) {
    return res.status(404).json({
      status: 404,
      message: 'person with id not availabe',
    });
  }

  const index = people.indexOf(person);
  people.splice(index, 1);

  res.status(200).json({
    status: 200,
    message: 'Success',
    data: person,
  });
});

module.exports = app;
