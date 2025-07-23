const express = require('express');

const {
    addExpense,
    getAllExpenses,
    deleteExpense,
    downloadExpenseExcel,
} = require('../controllers/expenseController');

const { protect } = require('../middlewares/authMiddleware');
const Router = express.Router();

Router.post('/add', protect, addExpense);
Router.get('/get', protect, getAllExpenses);
Router.delete('/:id', protect, deleteExpense);
Router.get('/download', protect, downloadExpenseExcel);

module.exports = Router;