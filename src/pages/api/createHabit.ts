import { NextApiRequest, NextApiResponse } from 'next';
import { PoolClient } from 'pg';
import pool from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { habit, user_email, table } = req.body;
  const client: PoolClient = await pool.connect();

  try {
    const newHabit = await client.query(
      `INSERT INTO ${table} (name, user_email) VALUES ($1, $2) RETURNING *;`,
      [habit, user_email]
    );
    res.json(newHabit.rows[0]);
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.log(error);
      res.status(500).json({ message: 'Error in createHabit API' });
    } else {
      res.status(500);
    }
  } finally {
    client.release();
  }
}
