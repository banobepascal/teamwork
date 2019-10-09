/* eslint-disable no-console */
import { Client } from 'pg';
import ENV from 'dotenv';
import setupTables from './dbQuery';

ENV.config();

const connect = process.env.DATABASE_URL;

const client = new Client(connect);
client.query(setupTables, (error) => {
  if (error) {
    console.error('connection error', error.stack);
  } else {
    console.log('created tables');
  }
  client.end();
});
client.connect();
