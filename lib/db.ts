import { Pool, PoolClient } from 'pg';

const pool: Pool = new Pool({
  connectionString: process.env.PG_URI,
});

const tableQuery = `CREATE TABLE IF NOT EXISTS habits (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  done_today BOOLEAN NOT NULL DEFAULT false,
  streak INTEGER NOT NULL DEFAULT 0,
  max_streak INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_email VARCHAR(255) NOT NULL
);`;

export async function createTable(): Promise<void> {
  const client: PoolClient = await pool.connect();

  try {
    await client.query(tableQuery);
  } finally {
    client.release();
  }
}

export default pool;
