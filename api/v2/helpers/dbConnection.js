/* eslint-disable no-console */
import { Client } from 'pg';
import ENV from 'dotenv';
import createTables from '../migrations/dbQuery';

ENV.config();

const connect = process.env.DATABASE_URL;

const client = new Client(connect);
client.query(createTables);
console.log('connected to database');
client.connect();

export default client;
