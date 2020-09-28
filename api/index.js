
const express = require('express');
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;
const apiRouter = express.Router();
const postsRouter = require('./posts');
const tagsRouter = require('./tags');
const usersRouter = require('./users');

apiRouter.use(async(req, res, next) => {
    try{
      const auth = req.header('Authorization');
      if(!auth) {
          next();
      } else {
          const [, token] = auth.split(' ');
          console.log('auth: ', auth);  

          const userObj = jwt.verify(token, JWT_SECRET);
          console.log('userObj.id: ', userObj.id);

          const user = await getUserById(userObj.id);
            console.log('user: ', user);

          req.user = user;
          next();
      }

    } catch (error) {
      next(error)  
    }
})

apiRouter.use(async (req, res, next) => {
    try {
        console.log('req.user: ', req.user);
        next();
    } catch (error) {
      next(error);
    }
})

apiRouter.use('/posts', postsRouter);
apiRouter.use('/tags', tagsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;