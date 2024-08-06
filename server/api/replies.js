const express = require('express');
const repliesRouter = express.Router();

const {
  getAllReplies,
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

module.exports = repliesRouter;
