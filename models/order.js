const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema');


// orderItemShema
const orderItemSchema = new Schema({
    qty: { type: Number, default: 1},
    item: itemSchema
}, {
    timestamps: true, 
    toJSON: {virtuals: true}
})

orderItemSchema.virtual('totPrice').get(function() {
    console.log(this);
    return this.qty * this.item.price;
})

// order Schema

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    checkoutDone: {type: Boolean, default: false},
    orderItems: [orderItemSchema]
}, {
    timestamps: true, 
    toJSON: {virtuals: true}
})

// orderSchema.virtual('orderTotal').get(() => {
//     // go through orderItems array and add together the totprices
//     // reduce method is a good easy way to sum an array
//     return 
// })

orderSchema.statics.getCart = function(userId) {
    // get cart with checkoutDone: false
    // if there is not checkoutDone: false cart, make one


    // option 1
    // check if exists this.findone
    // if doesn't exist do this.create

    // option 2 findOneAndUpdate
    // if no instance is found we can make it
    return this.findOneAndUpdate(
        {user: userId, checkoutDone: false},
        {user: userId},
        { upsert: true, new: true }
    )
}

module.exports = mongoose.model('Order', orderSchema);