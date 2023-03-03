import { NextApiRequest, NextApiResponse } from 'next';
import { PoolClient } from 'pg';
import pool from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_email, table } = req.query;
  const client: PoolClient = await pool.connect();

  try {
    const habits = await client.query(
      `SELECT * FROM ${table} WHERE user_email = $1`,
      [user_email]
    );
    res.json(habits.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error in getHabits API' });
  } finally {
    client.release();
  }
}
