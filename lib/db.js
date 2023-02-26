import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

const createTable = `CREATE TABLE IF NOT EXISTS habits (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  done_today BOOLEAN NOT NULL DEFAULT false,
  days_completed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_email VARCHAR(255) NOT NULL
);`;

pool.query(createTable);

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
