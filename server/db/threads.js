const db = require('./client');

const createThread = async({ user_id, title, content, date }) => {
  try {
    const { rows: [thread] } = await db.query(`
      INSERT INTO threads(user_id, title, content, date)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [user_id, title, content, date]);
    return thread;
  } catch (err) {
    throw err;
  }
};

const getThreadById = async(id) => {
  try {
    const { rows: [thread] } = await db.query(`
      SELECT * FROM threads WHERE id = $1
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
      SELECT * FROM threads
    `);
    return rows;
  } catch (err) {
    throw err;
  }
};

const deleteThread = async (id) => {
  try {
    const {rows: [thread]} = await db.query(`
      DELETE FROM threads WHERE id = $1 RETURNING *
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
      const currentThread = await getThreadById(id);
      return currentThread;
    };

    const setString = Object.keys(toUpdate)
      .map((col, index) => `"${col}" = $${index + 1}`)
      .join(", ");

    const { rows } = await db.query(`
      UPDATE threads
      SET ${setString}
      WHERE id = $${Object.keys(toUpdate).length + 1}
      RETURNING *;
    `, [...Object.values(toUpdate), id]);

    return rows[0];
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
}
