const express = require('express');
const apiRouter = express.Router();
const usersRouter = require('./users');
const postsRouter = require('./posts');
const tagsRouter = require('./tags');

apiRouter.use('./users.js', usersRouter);
apiRouter.use('./posts.js', postsRouter);
apiRouter.use('./tags.js', tagsRouter);

module.exports = apiRouter;