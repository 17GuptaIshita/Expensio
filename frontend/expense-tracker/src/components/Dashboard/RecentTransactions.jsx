import moment from 'moment'
import TransactionInfoCard from '../../components/Cards/TransactionInfoCard'


const RecentTransactions = ({transactions}) => {
  return (
    <div className='card'>
        <div className='flex item-center justify-between'>
           <h5 className='text-lg'>Recent Transactions</h5>
        </div>

        <div className='mt-4'>
            {[...(transactions || [])]
              .sort((a, b) => {
                const aTime = a.createdAt ? new Date(a.createdAt) : new Date(a.date);
                const bTime = b.createdAt ? new Date(b.createdAt) : new Date(b.date);
                return bTime - aTime;
              })
              .slice(0, 10)
              .map((item) => (
    <TransactionInfoCard
        key={item._id}
        title={item.type=='expense' ? item.category : item.source}
        icon={item.icon}
        date={moment(item.date).format("DD-MM-YYYY")}
        amount={item.amount}
        type={item.type}
        hideDeleteBtn
    />
))}
            </div>
        </div>
    )
}

export default RecentTransactions;