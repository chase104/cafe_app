const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema');


// orderItemShema
const orderItemSchema = new Schema({

})

// order Schema

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    checkoutDone: {type: Boolean, default: false},
    orderItems: [orderItemSchema]
}, {timestamps: true, toJSON: {virtuals: true}})

module.exports = mongoose.model('Order', orderSchema);