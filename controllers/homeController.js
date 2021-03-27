const { BloodTank } = require("../models/BloodTank");


exports.getBlood = async (req, res) => {
    
    // const bloodTank = await BloodTank.find()

    // console.log(bloodTank)

    res.render('index', {
        // spent: bloodTank.spent
    })
}

exports.login = async (req, res) => {
    res.render('authentication/login')
}

exports.donorSignup = async (req, res) => {
    res.render('authentication/signup-donor')
}
exports.pacientSignup = async (req, res) => {
    res.render('authentication/signup-pacient')
}