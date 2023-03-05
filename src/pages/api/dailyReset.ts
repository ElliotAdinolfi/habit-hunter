import cron from 'node-cron';
import { NextApiRequest, NextApiResponse } from 'next';
import { PoolClient } from 'pg';
import pool from '../../../lib/db';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  cron.schedule(
    '0 3 * * *',
    async () => {
      console.log('Daily reset at 3am EST');
      const client: PoolClient = await pool.connect();
      try {
        const resetHabits = await client.query(`UPDATE habits SET
        done_today = false,
        streak = CASE WHEN done_today = false THEN 0 ELSE streak END;`);
      } catch (error) {
        if (process.env.NODE_ENV === 'production') {
          console.log(error);
          res
            .status(500)
            .json({ message: 'Error in dailyReset API' });
        } else {
          res.status(500);
        }
      } finally {
        client.release();
      }
    },
    {
      timezone: 'America/New_York',
    }
  );
  res.status(200).json({ message: 'Daily Reset cron job started' });
}
