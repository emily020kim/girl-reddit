const db = require('./client');

const createReply = async({ user_id, thread_id, content }) => {
  try {
    const { rows: [reply] } = await db.query(`
      INSERT INTO replies(user_id, thread_id, content)
      VALUES($1, $2, $3)
      RETURNING *;  
    `, [user_id, thread_id, content]);
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

module.exports = {
  createReply,
  getAllReplies,
}
