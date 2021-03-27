const { BloodTank } = require("../models/BloodTank");


exports.getUser = async (req, res) => {
    
    console.log(req.user)
    res.render('profile', {
       
    })
}