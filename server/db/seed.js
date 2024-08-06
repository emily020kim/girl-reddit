require('dotenv').config();
const db = require('./client');
const { createAdmin } = require('./admin');
const { createUser } = require('./users');
const { createThread } = require('./threads');
const { createReply } = require('./replies');

const dropTables = async () => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS replies;
      DROP TABLE IF EXISTS threads;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS admin;
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
      CREATE TABLE admin(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        secret VARCHAR(255) UNIQUE
      );
    `);

    await db.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE threads(
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        CONSTRAINT fk_user
          FOREIGN KEY(user_id)
          REFERENCES users(id)
      );
    `);

    await db.query(`
      CREATE TABLE replies(
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        thread_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        CONSTRAINT fk_user
          FOREIGN KEY(user_id)
          REFERENCES users(id),
        CONSTRAINT fk_thread
          FOREIGN KEY(thread_id)
          REFERENCES threads(id)
      );
    `);

    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
    throw err;
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

const createInitialThreads = async () => {
  console.log("Starting to create initial threads...");

  try {
    const threadsToCreate = [
      { 
        user_id: 1,
        title: "What soap is good for people with sensitive skin?", 
        content: "I am struggling with eczema and looking for a soap that doesn't dry out my skin. I tried a lot brands that say they are sensitive skin friendly but haven't found a good one yet. Please drop recommendations!"
      },
      {
        user_id: 2,
        title: "I am considering getting a master's degree in Business Admin. Pros and cons?",
        content: "I am a recent graduate who just got their degree in Marketing. I am looking at grad programs in Business Administration and was wondering if anyone here was currently in one. Would appreciate advice!"
      }
    ];
    const threads = await Promise.all(threadsToCreate.map(createThread));
    console.log('Threads created');
    console.log(threads);
    console.log('Finished creating threads');
  } catch (error) {
    console.error('Error creating threads: ', error);
    throw error;
  }
};

const createInitialReplies = async () => {
  console.log("Starting to create replies...");

  try {
    const repliesToCreate = [
      {
        user_id: 2,
        thread_id: 1,
        content: "I tried using Aveeno and it helped but I noticed that if you put on a thin layer of Aquaphor it helps keep the moisture in!"
      },
      {
        user_id: 1,
        thread_id: 2,
        content: "I am currently in UCSD business admin program for my master's and am enjoying it so far! Feel free to dm me and I can answer your questions!"
      }
    ]
    const replies = await Promise.all(repliesToCreate.map(createReply));
    console.log('Replies created');
    console.log(replies);
    console.log('Finished creating replies');
  } catch (error) {
    console.error('Error creating replies: ', error);
    throw error;
  }
};

const seedDatabase = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialAdmin();
    await createInitialThreads();
    await createInitialReplies();
  } catch (err) {
    console.error('Error seeding database:', err);
    throw err;
  } finally {
    await db.end();
    console.log('Database connection closed');
  }
};

seedDatabase();
