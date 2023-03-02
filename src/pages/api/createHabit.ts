import { NextApiRequest, NextApiResponse } from 'next';
import { PoolClient } from 'pg';
import pool from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, user_email } = req.body;
  const client: PoolClient = await pool.connect();

  try {
    const newHabit = await client.query(
      'INSERT INTO habits (name, user_email) VALUES ($1, $2) RETURNING *',
      [name, user_email]
    );
    res.json(newHabit.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error in createHabit API: ${error}` });
  } finally {
    client.release();
  }
}
