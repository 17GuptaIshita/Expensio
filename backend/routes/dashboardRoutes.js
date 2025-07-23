const express = require("express");
const {protect} = require("../middlewares/authMiddleware");
const { getDashboardData, getAllTransactions } = require("../controllers/dashboardController");

const Router = express.Router();
Router.get("/", protect, getDashboardData);
Router.get("/all-transactions", protect, getAllTransactions);
module.exports = Router;