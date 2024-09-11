const db = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const { rows: existingUser } = await db.query(`
      SELECT username FROM users WHERE username = $1
    `, [username]);

    if (existingUser.length > 0) {
      throw new Error('Username already exists');
    }

    const { rows: [user] } = await db.query(`
      INSERT INTO users(username, password)
      VALUES($1, $2)
      RETURNING username, id
    `, [username, hashedPassword]);

    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByUsername = async (username) => {
  try {
    const { rows: [ user ] } = await db.query(`
      SELECT username, password, id FROM users WHERE username = $1
    `, [username]);

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that username does not exist."
      };
    }

    return user;
  } catch (err) {
    throw err;
  }
};

const getUser = async (username, password) => {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) return;

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (id) => {
  try {
    const { rows: [user] } = await db.query(`
      SELECT id, username FROM users WHERE id = $1
    `, [id]);

    return user || null;
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const { rows } = await db.query(`
      SELECT id, username FROM users
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const { rows: [user] } = await db.query(`
      DELETE FROM users WHERE id = $1 RETURNING id, username
    `, [id]);
    
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  getUser,
  deleteUser,
};