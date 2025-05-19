import { Pool } from 'pg';

// Pool database dengan koneksi dari environment variable
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432, // default 5432
});

export async function query(text: string, params?: any[]) {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    console.log('Executed query', { text, duration, rows: res.rowCount });

    return res;
  } catch (error) {
    console.error('Error executing query', { text, error });
    throw error;
  }
}

export async function getClient() {
  const client = await pool.connect();
  return client;
}
