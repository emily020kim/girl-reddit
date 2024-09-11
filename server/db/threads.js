const db = require('./client');

const createThread = async ({ user_id, title, content, date }) => {
  try {
    const { rows: [thread] } = await db.query(`
      INSERT INTO threads(user_id, title, content, date)
      VALUES($1, $2, $3, $4)
      RETURNING id, user_id, title, content, date
    `, [user_id, title, content, date]);
    return thread;
  } catch (err) {
    throw err;
  }
};

const getThreadById = async (id) => {
  try {
    const { rows: [thread] } = await db.query(`
      SELECT id, user_id, title, content, date FROM threads WHERE id = $1
    `, [id]);

    return thread || null;
  } catch (err) {
    throw err;
  }
};

const getAllThreads = async (limit = 10, offset = 0) => {
  try {
    const { rows } = await db.query(`
      SELECT id, user_id, title, content, date FROM threads
      ORDER BY date DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const deleteThread = async (id) => {
  try {
    const { rows: [thread] } = await db.query(`
      DELETE FROM threads WHERE id = $1 RETURNING id, user_id, title, content, date
    `, [id]);
    return thread;
  } catch (err) {
    throw err;
  }
};

const updateThread = async ({ id, ...fields }) => {
  try {
    const toUpdate = {};

    for (let column in fields) {
      if (fields[column] !== undefined) {
        toUpdate[column] = fields[column];
      }
    };

    if (Object.keys(toUpdate).length === 0) {
      return await getThreadById(id);
    }

    const setString = Object.keys(toUpdate)
      .map((col, index) => `"${col}" = $${index + 1}`)
      .join(", ");

    const { rows: [updatedThread] } = await db.query(`
      UPDATE threads
      SET ${setString}
      WHERE id = $${Object.keys(toUpdate).length + 1}
      RETURNING id, user_id, title, content, date;
    `, [...Object.values(toUpdate), id]);

    return updatedThread;
  } catch (error) {
    console.log("Updating thread error", error);
    throw error;
  }
};

module.exports = {
  createThread,
  getThreadById,
  getAllThreads,
  deleteThread,
  updateThread,
};