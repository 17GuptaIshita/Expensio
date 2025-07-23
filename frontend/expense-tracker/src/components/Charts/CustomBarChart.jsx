import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell,
} from 'recharts';

const CustomBarChart = ({ data }) => {

    const getBarColor = (index) => {
        return index % 2 === 0 ? '#875cf5' : '#cfbefb';
    };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
          <p className='text-xs font-semibold text-purple-800 mb-1'>{data.category}</p>
          {Array.isArray(data.categories) && data.categories.length === 1 && (
            <p className='text-xs text-gray-500 mb-1'>Category: Single</p>
          )}
          {Array.isArray(data.categories) && data.categories.length > 1 && (
            <p className='text-xs text-gray-500 mb-1'>Category: Multiple</p>
          )}
          {Array.isArray(data.sources) && data.sources.length === 1 && (
            <p className='text-xs text-gray-500 mb-1'>Source: Single</p>
          )}
          {Array.isArray(data.sources) && data.sources.length > 1 && (
            <p className='text-xs text-gray-500 mb-1'>Source: Multiple</p>
          )}
          <p className='text-sm text-gray-600'>
            Amount : <span className='text-sm font-medium text-gray-900'>₹ {data.amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className='bg-white rounded-xl shadow p-6 mt-6'>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="category" tick={false} axisLine={false} stroke="none" />
          <YAxis tick={{ fontSize: 14, fill: '#555' }} stroke="none" />
          <Tooltip content={CustomTooltip} />
          <Bar
            dataKey="amount"
            fill="#FF5042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8 , fill: '#FFB300' }}
            activeStyle={{fill: "green"}}
          >
            {data.map((entry, index) => (
                <Cell key={index} fill={getBarColor(index)}/>
            ))}
            </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomBarChart