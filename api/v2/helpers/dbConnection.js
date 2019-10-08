/* eslint-disable no-console */
// import dotenv from 'dotenv';
import { Client } from 'pg';
import createTables from '../migrations/dbQuery';

// dotenv.config();
const config = {
  user: 'postgres',
  database: 'teamworkdb',
  password: 'postgres',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

const client = new Client(config);
client.query(createTables);
console.log('connected to database');
client.connect();

export default client;
