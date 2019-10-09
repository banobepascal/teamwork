/* eslint-disable no-console */
import { Client } from 'pg';
import ENV from 'dotenv';
import { dropTables } from './dbQuery';

ENV.config();

const connect = process.env.DATABASE_URL;

const client = new Client(connect);
client.query(dropTables, (error) => {
  if (error) {
    console.error('connection error', error.stack);
  } else {
    console.log('tables dropped');
  }
  client.end();
});
client.connect();
