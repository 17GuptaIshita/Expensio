import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Expense List</h5>
            <button 
              className='card-btn'
              onClick={onDownload}
              disabled={!transactions || transactions.length === 0}
              style={!transactions || transactions.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
                <LuDownload className='text-base' />
              Download Expenses
            </button>
        </div>
        <div className="grid grid-cols-1 max-h-96 overflow-y-auto">
          {transactions?.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("DD MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense._id)}
            />
          ))}
        </div>
    </div>
  )
}

export default ExpenseList