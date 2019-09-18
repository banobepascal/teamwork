/* eslint-disable no-console */
import config from 'config';
import { createServer } from 'http';
import app from './api/index';

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

const port = process.env.Port || 3000;

const server = createServer(app);
console.log('listening on port 3000');
server.listen(port);
