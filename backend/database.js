import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;
dotenv.config();

let pool;

if (process.env.NODE_ENV === "production") {
  pool = new Pool({ connectionString: process.env.CONNECTION_STRING });
} else {
  pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
  });
}

async function getTopics() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query("SELECT DISTINCT topic FROM topics");
    return rows;
  } finally {
    client.release();
  }
}

async function getCategories(topics) {
  const categoryData = [];

  await Promise.all(
    topics.map(async (row) => {
      const client = await pool.connect();
      try {
        const { rows } = await client.query(
          "SELECT category FROM categories WHERE topic_id = (SELECT id FROM topics WHERE topic = $1)",
          [row.topic],
        );
        const categories = rows.map((row) => row.category);
        categoryData.push({
          topic: row.topic,
          categories: categories,
        });
      } finally {
        client.release();
      }
    }),
  );

  return categoryData;
}

async function getTopicsAndCategories() {
  const topics = await getTopics();
  const data = await getCategories(topics);
  return data;
}

async function getWordFromCategory(category) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT word FROM words INNER JOIN categories ON words.category_id = categories.id WHERE category = $1 ORDER BY RANDOM() LIMIT 1;",
      [category],
    );
    return rows[0].word;
  } finally {
    client.release();
  }
}

export const db = { getTopicsAndCategories, getWordFromCategory };
