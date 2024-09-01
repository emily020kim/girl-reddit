const express = require('express');
const likesRouter = express.Router();
const { requireUser } = require('./utils');

const {
  addLike,
  getLikesByThread,
} = require('../db/likes');

likesRouter.get('/:thread_id', async (req, res, next) => {
  try {
    const { thread_id } = req.params;

    const likeCount = await getLikesByThread(thread_id);

    res.status(200).json({ thread_id, likeCount });
  } catch (error) {
    next(error);
  }
});

likesRouter.post('/:thread_id', async (req, res, next) => {
  try {
    const { thread_id } = req.params;
    const { user_id, liked } = req.body;

    const like = await addLike({ user_id, thread_id, liked });

    res.status(201).json(like);
  } catch (error) {
    next(error);
  }
});

module.exports = likesRouter;