// api/users.js
const express = require('express');
const usersRouter = express.Router();
const { getAllUsers } = require('../db');

usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();

    try {
      const response = {message: 'hello'}
      res.send(response);
    }
    catch (error){
      console.error(error);
    }
  
    res.send({
      users
    });
  });

module.exports = usersRouter;