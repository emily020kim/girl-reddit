const db = require('./client');

// Ensure indexes on (id, user_id, thread_id)
const createReply = async ({ user_id, thread_id, content, date }) => {
  try {
    const { rows: [reply] } = await db.query(`
      INSERT INTO replies(user_id, thread_id, content, date)
      VALUES($1, $2, $3, $4)
      RETURNING id, user_id, thread_id, content, date;
    `, [user_id, thread_id, content, date]);
    return reply;
  } catch (err) {
    throw err;
  }
};

const getAllReplies = async () => {
  try {
    const { rows } = await db.query(`
      SELECT id, user_id, thread_id, content, date
      FROM replies;
    `);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getReplyById = async (id) => {
  try {
    const { rows: [reply] } = await db.query(`
      SELECT id, user_id, thread_id, content, date
      FROM replies
      WHERE id = $1;  -- Ensure id is indexed
    `, [id]);

    return reply || null;
  } catch (err) {
    throw err;
  }
};

const deleteReply = async (id) => {
  try {
    const { rows: [reply] } = await db.query(`
      DELETE FROM replies
      WHERE id = $1
      RETURNING id, user_id, thread_id, content, date;
    `, [id]);
    return reply || null;
  } catch (err) {
    throw err;
  }
};

const updateReply = async ({ id, ...fields }) => {
  try {
    const toUpdate = Object.entries(fields)
      .filter(([_, value]) => value !== undefined);

    if (toUpdate.length === 0) {
      return await getReplyById(id);
    }

    const setString = toUpdate
      .map(([col], index) => `"${col}" = $${index + 1}`)
      .join(", ");

    const values = toUpdate.map(([_, value]) => value);

    const { rows: [updatedReply] } = await db.query(`
      UPDATE replies
      SET ${setString}
      WHERE id = $${toUpdate.length + 1}
      RETURNING id, user_id, thread_id, content, date;
    `, [...values, id]);

    return updatedReply;
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
};