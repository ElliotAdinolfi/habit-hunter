import { NextApiRequest, NextApiResponse } from 'next';
import { PoolClient } from 'pg';
import pool from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client: PoolClient = await pool.connect();
    await client.query(`UPDATE habits SET
        done_today = false,
        streak = CASE WHEN done_today = false THEN 0 ELSE streak END;`);
    client.release();
    res.status(200).json({ message: 'Daily Reset cron job started' });
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.log(error);
      res.status(500).json({ message: 'Error in dailyReset API' });
    } else {
      res.status(500);
    }
  }
}
