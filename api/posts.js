
const express = require('express');
const postsRouter = express.Router();
const { getAllPosts } = require('../db');
  
  postsRouter.get('/', async (req, res) => {
      const posts = await getAllPosts();
      
      try {
        const response = {message: 'hello'}
        res.send(response);
      }
      catch (error){
        console.error(error);
      }

      res.send({
        "posts": []
      });
    });

module.exports = postsRouter;