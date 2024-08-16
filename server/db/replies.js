const db = require('./client');

const createReply = async({ user_id, thread_id, content, date }) => {
  try {
    const { rows: [reply] } = await db.query(`
      INSERT INTO replies(user_id, thread_id, content, date)
      VALUES($1, $2, $3, $4)
      RETURNING *;  
    `, [user_id, thread_id, content, date]);
    return reply;
  } catch (err) {
    throw err;
  }
};

const getAllReplies = async () => {
  try {
    const { rows } = await db.query(`
      SELECT * FROM replies;
    `);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getReplyById = async (id) => {
  try {
    const { rows: [reply] } = await db.query(`
      SELECT * FROM replies
      WHERE id=$1;
    `, [ id ]);

    if (!reply) {
      return;
    }
    return reply;
  } catch (err) {
    throw err;
  };
};

const deleteReply = async (id) => {
  try {
    const {rows: [reply]} = await db.query(`
      DELETE FROM replies
      WHERE id=$1
      RETURNING *;
    `, [id]);
    return reply;
  } catch (err) {
    throw err;
  }
};

const updateReply = async ({ id, ...fields }) => {
  try {
    const toUpdate = {};

    for (let column in fields) {
      if (fields[column] !== undefined) {
        toUpdate[column] = fields[column];
      }
    }

    if (Object.keys(toUpdate).length === 0) {
      const currentReply = await getReplyById(id);
      return currentReply;
    }

    const setString = Object.keys(toUpdate)
      .map((col, index) => `"${col}" = $${index + 1}`)
      .join(", ");

    const { rows } = await db.query(`
      UPDATE replies
      SET ${setString}
      WHERE id = $${Object.keys(toUpdate).length + 1}
      RETURNING *;
    `, [...Object.values(toUpdate), id]);

    return rows[0];
  } catch (error) {
    console.log("Updating reply error", error);
    throw error;
  }
};

module.exports = {
  createReply,
  getAllReplies,
  getReplyById,
  deleteReply,
  updateReply,
}
