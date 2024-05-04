import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getTopicsAndCategories() {
  const [rows] = await pool.query(
    "SELECT topic, category FROM topics INNER JOIN categories on topics.id = categories.topic_id",
  );
  return rows;
}

export const db = { getTopicsAndCategories };
