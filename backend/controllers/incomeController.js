const xlsx = require('xlsx');
const User= require('../models/User');
const Income= require('../models/Income');

exports.addIncome = async (req, res) => {
    const userId = req.user._id;
    try {
        const { icon, amount, source, date } = req.body;
        if (!amount || !source || !date) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        const newIncome = new Income({
            userId,
            icon,
            amount,
            source,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        const data = incomes.map(income => ({
            Source: income.source,
            Amount: income.amount,
            Date: income.date,
        }));

        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

};