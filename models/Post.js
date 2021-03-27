const { Schema, model } = require('mongoose')


const Post = new Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    blood: { type: Number, required: true },
    description: { type: String, required: true },
})
 
module.exports = model('Post', Post)
module.exports.postSchema = Post
