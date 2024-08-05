const express = require('express');
const threadsRouter = express.Router();

const {
  getAllThreads,
} = require('../db/threads');

threadsRouter.get('/', async(req, res, next) => {
  try {
    const threads = await getAllThreads();

    res.send({
      threads
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = threadsRouter;