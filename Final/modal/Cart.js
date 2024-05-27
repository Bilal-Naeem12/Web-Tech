const mongoose = require('mongoose');

// Define Cart Schema
const cartSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

// Create Cart model
const Cart = mongoose.model('Cart', cartSchema);

// Export Cart model
module.exports = Cart;