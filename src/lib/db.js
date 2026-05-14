import mysql from 'mysql2/promise';

let pool;

export async function connectDB() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      // Enable SSL if your cPanel requires it, but usually not for remote MySQL
      // ssl: { rejectUnauthorized: false }
    });
  }
  return pool;
}

export async function query(sql, params) {
  const db = await connectDB();
  try {
    const [results] = await db.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}
