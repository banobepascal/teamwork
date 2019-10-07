/* eslint-disable no-console */
import { Client } from 'pg';
import setupTables from './dbQuery';

const config = {
  user: 'postgres',
  database: 'teamworkdb',
  password: 'postgres',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

const client = new Client(config);
client.query(setupTables, (error) => {
  if (error) {
    console.error('connection error', error.stack);
  } else {
    console.log('created tables');
  }
  client.end();
});
client.connect();
