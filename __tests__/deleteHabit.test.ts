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
  });

  afterAll(async () => {
    await pool.query('DROP TABLE test_habits');
    await pool.end();
  });

  it('deletes the specified habit from the database', async () => {
    const id = 1;
    const user_email = 'test@test.com';
    const table = 'test_habits';

    const response = await axios.delete('/api/deleteHabit', {
      data: { id, user_email, table },
    });

    expect(response.status).toEqual(200);
    expect(response.data.id).toEqual(1);
  });

  it('should return nothing if the habit is not found', async () => {
    const id = 1;
    const user_email = 'test@test.com';
    const table = 'test_habits';

    const response = await axios.delete('/api/deleteHabit', {
      data: { id, user_email, table },
    });

    expect(response.status).toEqual(200);
    expect(response.data.id).toEqual(undefined);
  });
});
