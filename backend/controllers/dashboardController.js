const Income = require("../models/Income");
const Expense = require("../models/Expense");

const {isValidObjectId, Types} = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new Types.ObjectId(userId);

        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const last60DaysInconeTransactions = await Income.find({
            userId,
            date: {$gte:new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)}
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysInconeTransactions.reduce(
            (sum,transaction)=> sum + transaction.amount, 0
        );

        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: {$gte:new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
        }).sort({ date: -1 });

        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );
        
      const lastTransactions=[
        ... (await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
            (txn)=>({
                ...txn.toObject(),
                type: 'income'
            })
        ),
        ... (await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
            (txn)=>({
                ...txn.toObject(),
                type: 'expense'
            })
        ),
    ].sort((a, b) => b.date - a.date);

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses:{
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysInconeTransactions
            },
            recentTransactions: lastTransactions.slice(0, 5)
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }  
    };

exports.getAllTransactions = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch all income and expense transactions for the user
        const [incomeTxns, expenseTxns] = await Promise.all([
            Income.find({ userId }).sort({ date: -1 }),
            Expense.find({ userId }).sort({ date: -1 })
        ]);

        // Add type field to each transaction
        const incomeWithType = incomeTxns.map(txn => ({ ...txn.toObject(), type: 'income' }));
        const expenseWithType = expenseTxns.map(txn => ({ ...txn.toObject(), type: 'expense' }));

        // Merge and sort all transactions by date (descending)
        const allTransactions = [...incomeWithType, ...expenseWithType].sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json({ transactions: allTransactions });
    } catch (error) {
        console.error('Error fetching all transactions:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};