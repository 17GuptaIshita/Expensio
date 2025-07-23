const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    icon: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }},
    {
        timestamps: true
    });

    module.exports = mongoose.model('Expense', ExpenseSchema);
    
