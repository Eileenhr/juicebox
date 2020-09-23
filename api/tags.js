
const express = require('express');
const tagsRouter = express.Router();
const { getAlltags } = require('../db');
  
  tagsRouter.get('/', async (req, res) => {
      const tags = await getAlltags();

      try {
        const response = {message: 'hello'}
        res.send(response);
      }
      catch (error){
        console.error(error);
      }
      
      res.send({
        "tags": []
      });
    });

module.exports = tagsRouter;