const User = require("../models/User")
const Role = require("../models/Role")

const { validationResult } = require("express-validator")


class authController {
    async registerPacient(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Помилка при реєстрації", errors })
            }

            const {
                firstName, 
                lastName, 
                birthDate,
                blood,
                plasma,
                platelet,
                bloodGroup, 
                disease,
                collectCenter,
                city,
                sex,
                donorsAmount,
                phoneNumber,
                email, 
                additionalInfo,
                pass,
            } = req.body;
            const pacientRole = await Role.findOne({ value: "PACIENT" })
            const user = new User({ 
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: pass, 
                phone:  phoneNumber,
                birthDate: birthDate,
                sex: sex,
                bloodGroup: bloodGroup,
                blood: blood,
                plasma: plasma,
                platelet: platelet,
                disease: disease,
                collectCenter: collectCenter,
                city: city,
                donorsAmount: donorsAmount,                 
                roles: [pacientRole.value], 
                additionalInfo: additionalInfo })

            await user.save()
            const token = await user.generateAuthToken()

            res.status(201).send({ user, token })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async registerDonor(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Помилка при реєстрації", errors })
            }

            const {
                firstName, 
                lastName, 
                birthDate,
                bloodGroup, 
                city,
                sex,
                phoneNumber,
                email, 
                pass,
            } = req.body;
            const donorRole = await Role.findOne({ value: "DONOR" })
            const user = new User({ 
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: pass, 
                phone:  phoneNumber,
                birthDate: birthDate,
                sex: sex,
                bloodGroup: bloodGroup,
                city: city,           
                roles: [donorRole.value] })
            
            console.log(user)
            await user.save()
            const token = await user.generateAuthToken()

            res.status(201).send({ user, token })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

   
}

module.exports = new authController()