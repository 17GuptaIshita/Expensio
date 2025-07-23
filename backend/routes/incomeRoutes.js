const express = require('express');

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel,
}= require('../controllers/incomeController');

const { protect } = require('../middlewares/authMiddleware');
const Router = express.Router();

Router.post('/add', protect, addIncome);
Router.get('/get', protect, getAllIncome);
Router.delete('/:id', protect, deleteIncome);
Router.get('/download', protect, downloadIncomeExcel);

module.exports = Router;