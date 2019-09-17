/* eslint-disable no-console */
import { createServer } from 'http';
import app from './api/Auth/signup';

const port = process.env.Port || 3000;

const server = createServer(app);
console.log('listening on port 3000');
server.listen(port);
