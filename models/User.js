const { Schema, model } = require('mongoose')
const { postSchema } = require("../models/Post");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');


const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },

    birthDate: { type: Date, required: true},
    sex: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    blood: { type: Boolean },
    plasma: { type: Boolean },
    platelet: { type: Boolean },
    disease: { type: String },
    collectCenter: { type: String },
    city: { type: String, required: true },
    donorsAmount: { type: Number },

    roles: [ { type: String, ref: 'Role' } ],
    post: { type: postSchema, ref: 'Post' },
    additionalInfo: { type: String },

    tokens: [{ 
        token: { type: String, required: true }
    }]
})

userSchema.pre('save', async function (next) {
    const user = this
    console.log(this)
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 7)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email } )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }

    return user
}

const User = model('User', userSchema)
 
module.exports = User