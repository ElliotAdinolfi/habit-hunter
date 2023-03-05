import { NextApiRequest, NextApiResponse } from 'next';
import { PoolClient } from 'pg';
import pool from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, table } = req.body;
  const client: PoolClient = await pool.connect();

  try {
    const updateHabit = await client.query(
      `UPDATE ${table} SET done_today = true WHERE id = $1 RETURNING *`,
      [id]
    );

    res.json(updateHabit.rows[0]);
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.log(error);
      res.status(500).json({ message: 'Error in completeHabit API' });
    } else {
      res.status(500);
    }
  } finally {
    client.release();
  }
}
