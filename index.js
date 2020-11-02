const express = require('express')
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStratgy = require('passport-local')
const User = require('./models/User.js');
const keys = require('./keys.js');
const mongoose = require('mongoose');
const File = require('./models/File.js');
const Post = require('./models/Post.js')

const app = express();

app.use(bodyParser.json());

app.use(require('express-session')({
    secret: 'ahmedGomaa',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStratgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(keys.MongoDBUser);

app.post('/api/register', (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            res.send({message: "A user with the same email exists"})
        }else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email
            })
            User.register(newUser, req.body.password, (err, createdUser) => {
                if(err) {
                    res.send(err)
                }
                passport.authenticate("local")(req, res, () => {
                    res.send(req.user)
                })
            })
        }
    })
})

app.post('/api/login', (req, res) => {
    passport.authenticate('local', (err, user) => {
        if(err) {
            res.send({success: false, message: 'authentication failed'})
        }
        if(!user) {
            res.send({success: false, message: 'authentication failed'})
        }

        req.login(user, loginErr => {
            if(loginErr) {
                res.send({success: false, message: 'authentication failed'})
            }

            res.send(req.user)
        })
    })(req, res);
})

app.get('/api/user', (req, res) => {
    res.send(req.user)
});

app.post('/api/upload/file', File.upload.single('file'), (req, res) => {
    res.send(req.file)
})

app.post('/api/new/post', (req, res) => {
    const newPost = {
        body: req.body.body,
        author: {
            id: req.user._id,
            username: req.user.username
        },
        file: req.body.file
    }

    Post.create(newPost, (err, post) => {
        if(err) {
            console.log(err)
        }else {
            res.send(post)
        }
    })
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`The app is listening to:${port}`)
})