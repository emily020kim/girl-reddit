const express = require('express');
const apiRouter = express.Router();
const { getUserById } = require('../db/users');
const { getAdminById } = require('../db/admin');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'secretpass123' } = process.env;

const volleyball = require('volleyball')
apiRouter.use(volleyball)

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      
      const id = parsedToken && parsedToken.id
      if (id) {
        req.user = await getUserById(id);
        req.admin = await getAdminById(id);
        next();
      }
    } catch (error) {
      console.log("api router", error);
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const adminRouter = require('./admin');
apiRouter.use('/admin', adminRouter);

const threadsRouter = require('./threads');
apiRouter.use('/threads', threadsRouter);

const repliesRouter = require('./replies');
apiRouter.use('/replies', repliesRouter);

const likesRouter = require('./likes');
apiRouter.use('/likes', likesRouter);

apiRouter.use((err, req, res, next) => {
  res.status(500).send(err)
})

module.exports = apiRouter;