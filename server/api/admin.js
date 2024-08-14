require('dotenv').config();
const express = require('express');
const adminRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
  getAllAdmin,
  getAdmin,
  getAllUsers,
  getAllThreads,
  getAllReplies,
  getReplyById,
  getThreadById,
  deleteThread,
  deleteReply,
} = require('../db');

adminRouter.post('/login', async(req, res, next) => {
  try {
    const {username, password, secret} = req.body;
    console.log("req body", req.body);
    if(!username || !password || !secret) {
      next({
        name: 'MissingCredentialsError',
        message: 'Please supply both an username, password and secret key.'
      });
    }
    const admin = await getAdmin({username, password, secret});
    console.log("admin router", admin);
    if(!admin) {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username, password or secret key is incorrect',
      })
    } else {
      const token = jwt.sign({id: admin.id, username: admin.username}, JWT_SECRET, { expiresIn: '1w'});
      res.send({ admin, message: "You're logged in!", token});
    }
  } catch(error) {
    console.log("admin error", error);
    next(error);
  }
});

adminRouter.get('/', async( req, res, next) => {
  try {
    const admin = await getAllAdmin();

    res.send({
      admin
    });
  } catch (error) {
    console.log("Error getting all admin!", error);
    next(error)
  }
});

adminRouter.get('/users', async( req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users
    });
  } catch (error) {
    console.log("Error getting all users!", error);
    next(error);
  }
});

adminRouter.get('/threads', async( req, res, next) => {
  try {
    const threads = await getAllThreads();

    res.send({
      threads
    });
  } catch (error) {
    console.log("Error getting all threads!", error);
    next(error)
  }
});

adminRouter.get('/replies', async( req, res, next) => {
  try {
    const replies = await getAllReplies();

    res.send({
      replies
    });
  } catch (error) {
    console.log("Error getting all replies!", error);
    next(error)
  }
});

adminRouter.delete('/threads/:threadId', async (req, res, next) => {
  try {
    const threadId = await getThreadById(req.params.id);

    if(!threadToDelete) {
      next({
        name: 'NotFound',
        message: `No thread by ID ${threadId}`
      })
    } else {
      const deletedThread = await deleteThread(threadId)
      res.send({success: true, ...deletedThread});
    }
  } catch (error) {
    console.log("Delete thread", error);
    next(error);
  }
});

adminRouter.delete('/replies/:repliesId', async (req, res, next) => {
  try {
    const replyId = await getReplyById(req.params.id);

    if(!replyToDelete) {
      next({
        name: 'NotFound',
        message: `No reply by ID ${replyId}`
      })
    } else {
      const deletedReply = await deleteReply(replyId)
      res.send({success: true, ...deletedReply});
    }
  } catch (error) {
    console.log("Delete reply", error);
    next(error);
  }
});

module.exports = adminRouter;
