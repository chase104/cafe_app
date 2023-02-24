const express = require('express');
const path = require('path');
const logger = require('morgan');
// cross origin access 
const cors = require('cors');
const bcrypt = require('bcrypt');

// MODELS //
const User = require('./models/user.js');
const Category = require('./models/category')
const Item = require('./models/item')

const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./config/passport-config.js')

require('dotenv').config();
require('./config/database.js');

const app = express();

// access
app.use(cors({
    origin: "*"
}));

// logs the different requests to our server
app.use(logger('dev'))

//parse stringified objects (JSON)
app.use(express.json())


initializePassport(
    passport,
    // passport tells us that they want a function that will return the correct user given an email
    async email => {
        let user = User.findOne({email: email})
        return user;
    },
    async id => {
        let user = User.findById(id);
        return user;
    },
);

app.use(session({
    secure: true,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { originalMaxAge: 3600000 }
}))


// server build folder
app.use(express.static(path.join(__dirname, 'build')));

app.get('/get_categories', async (req, res) => {
    let arrayOfCategories = await Category.find();
    console.log(arrayOfCategories);
    res.json(arrayOfCategories)
})

app.get('/get_items', async (req, res) => {
    // when we have references in our Schemas, we can use the populate method to get that data
    let arrayOfItems = await Item.find().populate('category');
    console.log(arrayOfItems);
    res.json(arrayOfItems)
})

app.get('/test_route', (req, res) => {
    res.send("good route!")
})


app.get('/session-info', (req, res) => {
    res.json({
        session: req.session
    });
});


app.post('/users/signup',async (req, res) => {
    console.log(req.body);
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword);
    // use User model to place user in the database
    let userFromCollection = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword
    })
    console.log(userFromCollection);
    // sending user response after creation or login
    res.json("user created")
});


app.put('/users/login', async (req, res, next) => {
    console.log(req.body);
    // passport authentication
    passport.authenticate("local", (err, user, message) => {
        console.log(message);
        if (err) throw err;
        if (!user) {
            res.json({
                message: "login failed",
                user: false
            })
        } else {
            // delete user.password;
            req.logIn(user, err => {
                if (err) throw err;
                res.json({
                    message: "successfully authenticated",
                    // remove user
                })
            })
        }
    })(req, res, next);
})

// catch all route
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
});