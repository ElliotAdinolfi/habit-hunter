import { NextApiRequest, NextApiResponse } from 'next';
import { PoolClient } from 'pg';
import pool from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, table } = req.query;
  const client: PoolClient = await pool.connect();

  try {
    const incrementStreak = await client.query(
      `UPDATE ${table} 
      SET 
        streak = CASE WHEN done_today = true THEN streak ELSE streak + 1 END,
        done_today = true
      WHERE id = $1 AND done_today = false
      RETURNING *;`,
      [id]
    );
    client.release();
    res.json(incrementStreak.rows[0]);
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.log(error);
      res.status(500).json({ message: 'Error in completeHabit API' });
    } else {
      res.status(500);
    }
  }
}
