const express = require('express');
const likesRouter = express.Router();
const { requireUser, requiredNotSent } = require('./utils');

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

likesRouter.post('/:thread_id', requireUser, requiredNotSent({ requiredParams: ['liked'] }), async (req, res, next) => {
  try {
    const { liked } = req.body;
    const { thread_id } = req.params;
    const { id } = req.user;

    if (!id || liked === undefined) {
      return res.status(400).json({ error: 'Missing required fields: user_id or liked' });
    }

    const like = await addLike({ user_id: id, thread_id, liked });
    
    res.status(201).json(like);
  } catch (error) {
    console.error('Error in POST /likes/:thread_id:', error.message);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

module.exports = likesRouter;