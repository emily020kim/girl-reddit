require('dotenv').config();
const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const {
  getAllUsers,
  getUserById,
  getUser,
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
    const user = await getUserById(req.params.id);

    res.send({
      user
    });
  } catch (error) {
    next(error)
  }
});

usersRouter.post('/login', async(req, res, next) => {
  const { username, password } = req.body;

  if(!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both an username and password'
    });
  };
  
  try {
    const user = await getUser(username, password);
    if(!user) {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      })
    } else {
      const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '1w'});
      res.send({ user, message: "You're logged in!", token});
    }
  } catch(err) {
    next(err);
  }
});

module.exports = usersRouter;
