const db = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createAdmin = async({ name, username, password, secret }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const { rows: [admin] } = await db.query(`
      INSERT INTO admin(name, username, password, secret)
      VALUES($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING
      RETURNING *
    `, [name, username, hashedPassword, secret]);

    return admin;
  } catch (err) {
    throw err;
  }
}

async function getAllAdmin() {
  try {
    const {rows} = await db.query(`
      SELECT * FROM admin;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

const getAdmin = async({username, password, secret}) => {
  if(!username || !password || !secret) {
    return;
  }

  try {
    const admin = await getAdminByUsername(username);
    if(!admin) return;
    const hashedPassword = admin.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if(!passwordsMatch) return;
    delete admin.password;
    return admin;
  } catch (error) {
    console.log("Getting admin error!", error);
  }
}

const getAdminById = async(id) => {
  try {
    const { rows: [ admin ] } = await db.query(`
      SELECT * 
      FROM admin
      WHERE id=$1;
    `, [ id ]);

    if(!admin) {
      return;
    }
    return admin;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const getAdminByUsername = async(username) => {
  try {
    const { rows: [ admin ] } = await db.query(`
      SELECT * 
      FROM admin
      WHERE username=$1;
    `, [ username ]);

    if(!admin) {
      throw {
        name: "AdminNotFoundError",
        message: "An Admin with that username does not exist."
      }
    }

    return admin;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createAdmin,
  getAdmin,
  getAdminByUsername,
  getAllAdmin,
  getAdminById,
};
