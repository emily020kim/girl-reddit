const db = require('./client');

const createThread = async({ user_id, title, content }) => {
  try {
    const { rows: [thread] } = await db.query(`
      INSERT INTO threads(user_id, title, content)
      VALUES($1, $2, $3)
      RETURNING *;  
    `, [user_id, title, content]);
    return thread;
  } catch (err) {
    throw err;
  }
};

const getThreadById = async(id) => {
  try {
    const { rows: [thread] } = await db.query(`
      SELECT * FROM threads
      WHERE id=$1;
    `, [id]);

    if (!thread) {
      return;
    }
    return thread;
  } catch (err) {
    throw err;
  }
};

const getAllThreads = async () => {
  try {
    const { rows } = await db.query(`
      SELECT * FROM threads;
    `);
    return rows;
  } catch (err) {
    throw err;
  }
};

const deleteThread = async (id) => {
  try {
    const {rows: [thread]} = await db.query(`
      DELETE FROM threads
      WHERE id=$1
      RETURNING *;
    `, [id]);
    return thread;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createThread,
  getThreadById,
  getAllThreads,
  deleteThread,
}
