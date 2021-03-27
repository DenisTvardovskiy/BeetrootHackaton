const { Router } = require('express')
const homeController = require("../controllers/homeController");

const homeRouter = Router()

homeRouter.get('/', homeController.getBlood)
homeRouter.get('/login', homeController.login)
homeRouter.get('/signup/donor', homeController.donorSignup)
homeRouter.get('/signup/pacient', homeController.pacientSignup)
 

module.exports = homeRouter