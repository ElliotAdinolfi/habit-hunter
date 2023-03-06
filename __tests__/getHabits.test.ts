import axios from 'axios';
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
} from '@jest/globals';
import pool from '../lib/db';

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
    await pool.query(
      `INSERT INTO test_habits (name, user_email) VALUES ('Test Habit 2', 'test@test.com')`
    );
    await pool.query(
      `INSERT INTO test_habits (name, user_email) VALUES ('Test Habit 3', 'othertest@test.com')`
    );
  });

  afterAll(async () => {
    await pool.query('DROP TABLE test_habits');
    await pool.end();
  });

  it('should get a list of tests in db associated with specific user', async () => {
    const user_email = 'test@test.com';
    const table = 'test_habits';
    const response = await axios.get(
      `/api/getHabit?user_email=${user_email}&table=${table}`
    );
    expect(response.status).toEqual(200);
    expect(response.data.length).toEqual(2);
  });

  it('should return nothing if the user has no habits', async () => {
    const user_email = 'test3@test.com';
    const table = 'test_habits';
    const response = await axios.get(
      `/api/getHabit?user_email=${user_email}&table=${table}`
    );
    expect(response.status).toEqual(200);
    expect(response.data.length).toEqual(0);
  });
});
