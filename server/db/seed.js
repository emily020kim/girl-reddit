require('dotenv').config();
const db = require('./client');
const { createAdmin } = require('./admin');
const { createUser } = require('./users');
const { createThread } = require('./threads');
const { createReply } = require('./replies');
const { addLike } = require('./likes');

const dropTables = async () => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS likes;
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
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user
          FOREIGN KEY(user_id)
          REFERENCES users(id),
        CONSTRAINT fk_thread
          FOREIGN KEY(thread_id)
          REFERENCES threads(id)
      );
    `);

    await db.query(`
      CREATE TABLE likes(
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        thread_id INTEGER NOT NULL,
        liked BOOLEAN NOT NULL,
        CONSTRAINT fk_user
          FOREIGN KEY(user_id)
          REFERENCES users(id),
        CONSTRAINT fk_thread
          FOREIGN KEY(thread_id)
          REFERENCES threads(id),
        UNIQUE(user_id, thread_id)
      );
    `);

    await db.query(`
      CREATE INDEX idx_users_username ON users(username);
    `);

    await db.query(`
      CREATE INDEX idx_admin_username ON admin(username);
    `);

    await db.query(`
      CREATE INDEX idx_thread_id ON threads(id);
    `);

    await db.query(`
      CREATE INDEX idx_user_id ON threads(user_id);
    `);

    await db.query(`
      CREATE UNIQUE INDEX idx_replies_id ON replies(id);
    `);

    await db.query(`
      CREATE INDEX idx_replies_user_id ON replies(user_id);
    `);

    await db.query(`
      CREATE INDEX idx_replies_thread_id ON replies(thread_id);
    `);

    await db.query(`
      CREATE INDEX idx_likes_user_thread ON likes(user_id, thread_id);
    `);

    await db.query(`
      CREATE INDEX idx_likes_thread_liked ON likes(thread_id, liked);
    `);

    console.log('Tables and indexes created successfully');
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
      { username: 'metaknight', password: process.env.DB_USER1 },
      { username: 'kirby', password: process.env.DB_USER2 },
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
        content: "I am struggling with eczema and looking for a soap that doesn't dry out my skin. I tried a lot brands that say they are sensitive skin friendly but haven't found a good one yet. Please drop recommendations!",
        date: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        user_id: 2,
        title: "I am considering getting a master's degree in Business Admin. Pros and cons?",
        content: "I am a recent graduate who just got their degree in Marketing. I am looking at grad programs in Business Administration and was wondering if anyone here was currently in one. Would appreciate advice!",
        date: new Date().toISOString().slice(0, 19).replace('T', ' ')
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
        content: "I tried using Aveeno and it helped but I noticed that if you put on a thin layer of Aquaphor it helps keep the moisture in!",
        date: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        user_id: 1,
        thread_id: 2,
        content: "I am currently in UCSD business admin program for my master's and am enjoying it so far! Feel free to dm me and I can answer your questions!",
        date: new Date().toISOString().slice(0, 19).replace('T', ' ')
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

const createInitialLikes = async () => {
  console.log("Starting to create initial likes...");

  try {
    const likesToCreate = [
      {
        user_id: 1,
        thread_id: 1,
        liked: true
      },
      {
        user_id: 2,
        thread_id: 2,
        liked: true
      }
    ];
    const likes = await Promise.all(likesToCreate.map(addLike));
    console.log('Likes created');
    console.log(likes);
    console.log('Finished creating likes');
  } catch (error) {
    console.error('Error creating likes: ', error);
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
    await createInitialLikes();
  } catch (err) {
    console.error('Error seeding database:', err);
    throw err;
  } finally {
    await db.end();
    console.log('Database connection closed');
  }
};

seedDatabase();