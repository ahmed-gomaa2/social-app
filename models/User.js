const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    created: {
        type: Date,
        default: Date.now()
    },
    likedPosts: [
        {
            postId: String,
            _id: String
        }
    ],
    dislikedPosts: [
        {
            postId: String,
            _id: String
        }
    ]
})


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;