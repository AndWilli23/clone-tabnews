import { Pool } from "pg";

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
});

async function query(queryobject) {
  const client = await pool.connect();

  try {
    const result = await client.query(queryobject);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
}

export default {
  query: query,
};
