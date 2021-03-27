const { Router } = require('express')
const { check } = require("express-validator")
const authRouter = Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

authRouter.post('/login', authController.login)


authRouter.post('/signup/donor',[
    check('pass', "Пароль має бути від 4 до 15 символів").isLength({min:4, max:15})
], authController.registerDonor)

authRouter.post('/signup/pacient',[
    check('pass', "Пароль має бути від 4 до 15 символів").isLength({min:4, max:15})
], authController.registerPacient)

module.exports = authRouter 