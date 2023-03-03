import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  jest,
} from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../lib/db';
import handler from '../src/pages/api/createHabit';

describe('createHabit API should add a row to the database with the correct values', () => {
  beforeAll(async () => {
    await pool.query('DROP TABLE IF EXISTS test_habits');
    await pool.query(`CREATE TABLE IF NOT EXISTS test_habits (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      done_today BOOLEAN NOT NULL DEFAULT false,
      days_completed INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      user_email VARCHAR(255) NOT NULL
    );`);
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should add a row to the database with the correct values', async () => {
    const req: NextApiRequest = {
      method: 'POST',
      body: {
        name: 'Test Habit',
        user_email: 'test@example.com',
        table: 'test_habits',
      },
      headers: {},
      url: '',
    } as NextApiRequest;

    const res: NextApiResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    const results: any = await pool.query(
      'SELECT COUNT(*) FROM test_habits'
    );

    expect(results.rows[0].count).toBe('1');
  });
});
