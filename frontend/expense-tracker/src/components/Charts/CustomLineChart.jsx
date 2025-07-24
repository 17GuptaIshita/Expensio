import React from 'react'
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';

const CustomLineChart = ({data}) => {

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300 '>
                    <p className='text-xs font-semibold text-purple-800 mb-1'>Category: {data.category}</p>
                    <p className='text-xs text-gray-500 mb-1'>Date: {data.date}</p>
                    <p className='text-sm text-gray-600'>
                        Amount: <span className='text-sm font-medium text-gray-900'>₹ {data.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    }
  const noData = !data || data.length === 0 || data.every(item => !item.amount || Number(item.amount) === 0);
  return (
    <div className='bg-white min-h-[250px] flex items-center justify-center'>
      {noData ? (
        <div className="text-center w-full">
          <div className="text-4xl mb-2">😎</div>
          <div className="text-lg font-semibold text-gray-500">
          No expenses to chart! Your savings game is so strong, even your wallet’s smiling.          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#875cf5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#cfbefb" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="none" />
            <XAxis dataKey="date" tick={{fontSize:12, fill:'#555'}} axisLine={false} stroke="none" />
            <YAxis tick={{fontSize:12, fill:"#555"}} stroke="none" />
            <Tooltip content={CustomTooltip} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#875cf5"
              fill="url(#incomeGradient)"
              strokeWidth={3}
              dot={{ r: 3, fill: '#ab8df8' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default CustomLineChart