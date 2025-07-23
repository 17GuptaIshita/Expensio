import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income Sources</h5>

            <button className='card-btn' onClick={onDownload}
              disabled={!transactions || transactions.length === 0}
              style={!transactions || transactions.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
       >
                <LuDownload className='text-base' />
                Download
            </button>
        </div>
            <div className='flex flex-col gap-3 mt-6 overflow-y-auto' style={{maxHeight: 400}}>
                {transactions?.map((income)=>(
                    <TransactionInfoCard
                        key={income._id}
                        title={income.source}
                        icon={income.icon}
                        amount={income.amount}
                        date={moment(income.date).format('DD-MMM-YYYY')}
                        type="income"
                        onDelete={() => onDelete(income._id)}
                    />
                ))}
            </div>
        </div>
  )
}

export default IncomeList