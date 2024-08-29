const express = require('express');
const threadsRouter = express.Router();
const { requireUser, requiredNotSent } = require('./utils');

const {
  getAllThreads,
  getThreadById,
  createThread,
  updateThread,
  deleteThread,
} = require('../db');

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

threadsRouter.post('/', requireUser, requiredNotSent({ requiredParams: ['title', 'content'] }), async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;

    const date = new Date().toISOString();

    const createdThread = await createThread({
      user_id: id,
      title,
      content,
      date,
    });

    if (createdThread) {
      res.send(createdThread);
    } else {
      next({
        name: 'FailedToCreate',
        message: 'There was an error creating your thread'
      });
    }
  } catch (error) {
    next(error);
  }
});

threadsRouter.patch('/:id', requireUser, requiredNotSent({ requiredParams: ['title', 'content'], atLeastOne: true }), async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    const threadToUpdate = await getThreadById(id);

    if (!threadToUpdate) {
      next({
        name: 'NotFound',
        message: `No thread found with ID ${id}`
      });
    } else {
      if (req.user.id !== threadToUpdate.user_id) {
        next({
          name: "WrongUserError",
          message: "You must be the original creator of this thread to update it."
        });
      } else {
        const updatedThread = await updateThread({ id, title, content });

        if (updatedThread) {
          res.send(updatedThread);
        } else {
          next({
            name: 'FailedToUpdate',
            message: 'There was an error updating your thread'
          });
        }
      }
    }
  } catch (error) {
    console.log("Updating thread error", error);
    next(error);
  }
});

threadsRouter.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const threadToDelete = await getThreadById(req.params.id);

    if (!threadToDelete) {
      next({
        name: 'NotFound',
        message: `No thread found with ID ${req.params.id}`
      });
    } else if (req.user.id !== threadToDelete.user_id) {
      next({
        name: "WrongUserError",
        message: "You must be the original creator of this thread to delete it."
      });
    } else {
      const deletedThread = await deleteThread(req.params.id);
      res.send({ success: true, ...deletedThread });
    }
  } catch (error) {
    console.log("Delete thread error", error);
    next(error);
  }
});

threadsRouter.get('/search', (req, res) => {
  const searchTerm = req.query.term;
  if (!searchTerm) {
    return res.status(400).json({
      error: 'Search term is required'
    });
  }
  
  const query = `
    SELECT * FROM threads
    WHERE title LIKE ?
  `;
  
  const searchValue = `%${searchTerm}%`;
  
  db.query(query, [searchValue], (err, results) => {
    if (err) {
      console.error('Error executing search query:', err);
      return res.status(500).json({
        error: 'Internal server error'
      });
    }
      
    res.json(results);
  });
});


module.exports = threadsRouter;