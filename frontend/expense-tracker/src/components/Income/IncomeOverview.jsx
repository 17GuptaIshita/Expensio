import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/Helper'


const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [charData, setCharData] = useState([])
  useEffect(() => {
    const result = prepareIncomeBarChartData ? prepareIncomeBarChartData(transactions) : [];
    setCharData(result)
  }, [transactions])

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <span className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </span>
        </div>
        <button className="card-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" /> Add Income
        </button>
      </div>
      <div className="mt-10">
        <CustomBarChart data={charData} />
      </div>
    </div>
  )
}

export default IncomeOverview