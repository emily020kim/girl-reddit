const express = require('express');
const threadsRouter = express.Router();

const {
  getAllThreads,
  getThreadById,
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

threadsRouter.get('/:id', async(req, res, next) => {
  try {
    const thread = await getThreadById(req.params.id);

    res.send({
      thread
    });
  } catch (error) {
    next(error)
  }
});

module.exports = threadsRouter;