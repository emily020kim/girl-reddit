const express = require('express');
const usersRouter = express.Router();

const {
  getAllUsers,
  getUserById,
} = require('../db/users');

usersRouter.get('/', async( req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users
    });
  } catch (error) {
    console.log(error)
    next(error)
  }
});

usersRouter.get('/:id', async(req, res, next) => {
  try {
    const user = await getUserById();
    res.send({user});
  } catch(error) {
    console.log(error)
    next(error)
  }
})

module.exports = usersRouter;
