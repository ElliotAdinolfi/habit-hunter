import axios from 'axios';
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
} from '@jest/globals';
import pool from '../lib/db';

// @ts-ignore
describe('completeHabit API', () => {
  beforeAll(async () => {
    await pool.query(`CREATE TABLE IF NOT EXISTS test_habits (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      done_today BOOLEAN NOT NULL DEFAULT false,
      streak INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      user_email VARCHAR(255) NOT NULL
    );`);
    await pool.query(
      `INSERT INTO test_habits (name, user_email) VALUES ('Test Habit 1', 'test@test.com')`
    );
  });

  afterAll(async () => {
    await pool.query('DROP TABLE test_habits');
    await pool.end();
  });

  it('increments streak when habit is completed', async () => {
    const id = 1;
    const testTable = 'test_habits';
    const response = await axios.put(
      `http://localhost:3000/api/completeHabit?id=${id}&table=${testTable}`
    );
    expect(response.status).toEqual(200);
    expect(response.data.streak).toEqual(1);
  });

  it('does not increment streak when habit is already completed', async () => {
    const id = 1;
    const testTable = 'test_habits';
    const response = await axios.put(
      `http://localhost:3000/api/completeHabit?id=${id}&table=${testTable}`
    );
    expect(response.status).toEqual(200);
    expect(response.data.streak).toBe(undefined);
  });
});
