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
const Order = require('./models/order')

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
    res.json(arrayOfCategories)
})

app.get('/get_items', async (req, res) => {
    // when we have references in our Schemas, we can use the populate method to get that data
    let arrayOfItems = await Item.find().populate('category');

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

    let hashedPassword = await bcrypt.hash(req.body.password, 10)

    // use User model to place user in the database
    let userFromCollection = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword
    })

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
            // delete user.password
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

app.get("/get_cart", async (req, res) => {
    // get cart/order from database
    console.log(req.session);
    let cart = await Order.getCart(req.session.passport.user._id);
    console.log(cart);
    res.json(cart)
})

// for the "add" button

app.put('/add_to_cart/:itemId', async (req, res) => {
    let { itemId } = req.params;
    let userId = req.session.passport.user._id;
    let cart = await Order.getCart(userId);
    console.log(cart); 
    // check if orderItems already has this item (the we will +1)
    // if not, add it to the array
    const orderItem = cart.orderItems.find(orderItem => orderItem.item._id.equals(itemId))

    if (orderItem) {
        orderItem.qty += 1;
    } else {
        const item = await Item.findById(itemId);
        console.log(item);
        cart.orderItems.push({
            qty: 1,
            item
        });
    }

    cart.save()
    res.send(cart)
})

app.put('/change_qty', async (req, res) => {
    let { itemId, newQty } = req.body;
    let userId = req.session.passport.user._id;
    console.log(itemId, newQty, userId);

    let cart = await Order.getCart(userId); // checkoutDone false
    const orderItem = cart.orderItems.find(orderItem => {
        console.log(orderItem.item, itemId);
        if (orderItem.item._id.equals(itemId)) {
            return orderItem
        }
        
    })
    console.log(orderItem);
    orderItem.qty = newQty;

    // check if qty is 0
    if (orderItem.qty === 0) {
        orderItem.remove();
    }

    cart.save()

    res.send(cart)
})


app.put("/checkout", async (req, res) => {
    let cart = await Order.getCart(req.session.passport.user._id);

    cart.checkoutDone = true;
    cart.save()

    res.send(cart)

})

// catch all route
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
});