const { Router } = require('express')
const profileController = require("../controllers/profileController");
const authMiddleware = require('../middlewares/authMiddleware')

const profileRouter = Router()

profileRouter.get('/profile', profileController.getUser)
 

module.exports = profileRouter