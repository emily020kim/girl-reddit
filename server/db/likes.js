const db = require('./client');

const addLike = async ({ user_id, thread_id, liked }) => {
  try {
    const { rows: [like] } = await db.query(`
      INSERT INTO likes(user_id, thread_id, liked)
      VALUES($1, $2, $3)
      ON CONFLICT(user_id, thread_id)
      DO UPDATE SET liked = EXCLUDED.liked
      RETURNING *;
    `, [user_id, thread_id, liked]);
    return like;
  } catch (error) {
    throw error;
  }
};

const getLikesByThread = async (thread_id) => {
  try {
    const { rows: [likeCount] } = await db.query(`
      SELECT COUNT(*) AS like_count
      FROM likes
      WHERE thread_id = $1 AND liked = true;
    `, [thread_id]);
    return parseInt(likeCount.like_count, 10);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addLike,
  getLikesByThread
};