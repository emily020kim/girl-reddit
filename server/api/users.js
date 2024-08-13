require('dotenv').config();
const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const {
  getAllUsers,
  getUserById,
  getUser,
  createUser,
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
  const {username, password} = req.body;

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

usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    const queriedUser = await getUser(username);
    if (queriedUser) {
      res.status(409);
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
      });
    } 
    else if (password.length < 8) {
      res.status(400);
      next({
        name: 'PasswordLengthError',
        message: 'Password Too Short!',
      });
    } 
    else {
      const user = await createUser({ username, password });
      if (!user) {
        res.status(500);
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.',
        });
      } else {
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1w' });
        res.send({ user, message: "You're signed up!", token });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
