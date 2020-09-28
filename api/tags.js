
const express = require('express');
const tagsRouter = express.Router();
const { getPostsByTagName } = require('../db');
const { requireUser } = require('./utils');

  tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const { tagName } = req.params;
    try {
        const allPosts = await getPostsByTagName(tagName);
        const posts = allPosts.filter(post => {
          if (post.active) {
            return true;
          }
        
          if (req.user && post.author.id === req.user.id) {
            return true;
          }
          return false;
        });
      
      res.send({
        posts
      });
    }

      catch (error){
        console.error(error);
      }
    });

module.exports = tagsRouter;
