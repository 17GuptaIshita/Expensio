const xlsx = require('xlsx');
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const { icon, amount, category, date } = req.body;
        const newExpense = new Expense({
            userId,
            icon,       
            amount,
            category,
            date: new Date(date)
        });
        await newExpense.save();
        res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error: error.message });
    }    
}

exports.getAllExpenses = async (req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error: error.message });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        const data = expenses.map(expense => ({
            Amount: expense.amount,
            Category: expense.category,
            Date: expense.date
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expenses');
        xlsx.writeFile(wb, 'Expenses.xlsx');
        res.download('Expenses.xlsx', 'Expenses.xlsx');
    } catch (error) {
        res.status(500).json({ message: 'Error generating Excel file', error: error.message });
    }
};