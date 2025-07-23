const express = require('express');
const { createOrder, updatePaymentStatus } = require('../controllers/paymentController');
const Router = express.Router();



Router.post('/create-order', createOrder);
Router.post('/update-payment-status', updatePaymentStatus);

module.exports = Router;
