require('dotenv').config();
const db = require('./client');
const { createUser } = require('./users');
const { createAdmin } = require('./admin');

const dropTables = async () => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS admin;
      DROP TABLE IF EXISTS users;
    `);
    console.log('Tables dropped successfully');
  } catch (err) {
    console.error('Error dropping tables:', err);
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE admin(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        secret VARCHAR(255) UNIQUE
      );
    `);

    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
    throw err;
  }
};

const createInitialUsers = async () => {
  console.log('Starting to create users...');
  if (!process.env.DB_USER1 || !process.env.DB_USER2) {
    throw new Error('Missing user environment variables.');
  }

  try {
    const usersToCreate = [
      { name: 'Ariel Lopez', username: 'metaknight', password: process.env.DB_USER1 },
      { name: 'Tyler Oakley', username: 'kirby', password: process.env.DB_USER2 },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users:', error);
    throw error;
  }
};

const createInitialAdmin = async () => {
  console.log('Starting to create admin...');
  if (!process.env.DB_ADMIN || !process.env.DB_ADMIN_SECRET) {
    throw new Error('Missing admin environment variables.');
  }

  try {
    const adminToCreate = [
      { name: "Admin", username: "diphylleia", password: process.env.DB_ADMIN, secret: process.env.DB_ADMIN_SECRET },
    ];
    const admin = await Promise.all(adminToCreate.map(createAdmin));

    console.log('Admin created:');
    console.log(admin);
    console.log('Finished creating admin!');
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
};

const seedDatabase = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialAdmin();
  } catch (err) {
    console.error('Error seeding database:', err);
    throw err;
  } finally {
    await db.end();
    console.log('Database connection closed');
  }
};

seedDatabase();
