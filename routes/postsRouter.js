const { Router } = require('express')
const postController = require("../controllers/postController");

const postRouter = Router()


postRouter.get('/posts', postController.getPosts)


module.exports = postRouter