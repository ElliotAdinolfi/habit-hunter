import { NextApiRequest, NextApiResponse } from 'next';
import { PoolClient } from 'pg';
import pool from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, user_email, table } = req.body;
  const client: PoolClient = await pool.connect();

  try {
    const deletedHabit = await client.query(
      `DELETE FROM ${table} WHERE id = $1 AND user_email = $2;`,
      [id, user_email]
    );
    res.status(200).json(deletedHabit);
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.log(error);
      res.status(500).json({ message: 'Error in deleteHabit API' });
    } else {
      res.status(500);
    }
  } finally {
    client.release();
  }
}
