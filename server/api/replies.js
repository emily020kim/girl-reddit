const express = require('express');
const repliesRouter = express.Router();

const {
  getAllReplies,
  getReplyById,
} = require('../db/replies');

repliesRouter.get('/', async(req, res, next) => {
  try {
    const replies = await getAllReplies();

    res.send({
      replies
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

repliesRouter.get('/:id', async(req, res, next) => {
  try {
    const reply = await getReplyById(req.params.id);

    res.send({
      reply
    });
  } catch (error) {
    next(error)
  }
});

module.exports = repliesRouter;
