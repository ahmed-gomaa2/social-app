const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    body: String,
    file: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    created: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;