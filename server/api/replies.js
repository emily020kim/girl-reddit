const express = require('express');
const repliesRouter = express.Router();
const { requireUser, requiredNotSent } = require('./utils');

const {
  getAllReplies,
  getReplyById,
  createReply,
  updateReply,
  deleteReply,
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

repliesRouter.post('/:thread_id', requireUser, requiredNotSent({ requiredParams: ['content'] }), async (req, res, next) => {
  try {
    const { content } = req.body;
    const { id } = req.user;
    const { thread_id } = req.params;

    const date = new Date().toISOString();

    const createdReply = await createReply({
      user_id: id,
      thread_id,
      content,
      date,
    });

    if (createdReply) {
      res.send(createdReply);
    } else {
      next({
        name: 'FailedToCreate',
        message: 'There was an error creating your reply'
      });
    }
  } catch (error) {
    next(error);
  }
}); 

repliesRouter.patch('/:id', requiredNotSent({ requiredParams: ['content'] }), async (req, res, next) => {
  try {
    const { content, user_id, thread_id, date } = req.body;
    const { id } = req.params;

    const replyToUpdate = await getReplyById(id);

    if (!replyToUpdate) {
      return next({
        name: 'NotFound',
        message: `No reply found with ID ${id}`,
      });
    }

    if (req.user.id !== replyToUpdate.user_id) {
      return next({
        name: "WrongUserError",
        message: "You must be the original creator of this reply to update it",
      });
    }

    const updatedReply = await updateReply({ 
      id, 
      user_id, 
      thread_id, 
      content, 
      date 
    });

    if (updatedReply) {
      res.send(updatedReply);
    } else {
      next({
        name: 'FailedToUpdate',
        message: 'There was an error updating your reply',
      });
    }
  } catch (error) {
    console.log("Updating reply error", error);
    next(error);
  }
});

repliesRouter.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const replyToDelete = await getReplyById(req.params.id);

    if (!replyToDelete) {
      next({
        name: 'NotFound',
        message: `No reply found with ID ${req.params.id}`
      });
    } else if (req.user.id !== replyToDelete.user_id) {
      next({
        name: "WrongUserError",
        message: "You must be the original creator of this reply to delete it."
      });
    } else {
      const deletedReply = await deleteReply(req.params.id);
      res.send({ success: true, ...deletedReply });
    }
  } catch (error) {
    console.log("Delete reply error", error);
    next(error);
  }
});

module.exports = repliesRouter;
