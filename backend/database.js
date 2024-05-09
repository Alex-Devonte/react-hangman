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

async function getTopics() {
  const [rows] = await pool.query("SELECT DISTINCT topic FROM topics");
  return rows;
}

async function getCategories(topics) {
  const categoryData = [];

  await Promise.all(
    topics.map(async (row) => {
      const [rows] = await pool.query(
        "SELECT category FROM categories WHERE topic_id = (SELECT id FROM topics WHERE topic = ?)",
        [row.topic],
      );

      //Extract the categories from the object
      const categories = rows.map((row) => row.category);

      //Create new object for data array
      const newObj = {
        topic: row.topic,
        categories: categories,
      };

      categoryData.push(newObj);
    }),
  );

  return categoryData;
}

async function getTopicsAndCategories() {
  const topics = await getTopics();
  const data = await getCategories(topics);
  return data;
}

export const db = { getTopicsAndCategories };
