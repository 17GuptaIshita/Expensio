import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import useUserAuth from '../../hooks/useUserAuth'; 
import axiosInstance from '../../utils/axiosInstance';
import API_PATHS from '../../utils/ApiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';


import { addThousandSeparator } from '../../utils/Helper';
import TransactionHeatmap from '../../components/Dashboard/TransactionHeatmap';

const Home = () => {
  useUserAuth();

  const [allTransactions, setAllTransactions] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllTransactions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_ALL_TRANSACTIONS);
      if (response.data && response.data.transactions) {
        setAllTransactions(response.data.transactions);
      }
    } catch (error) {
      console.error('Error fetching all transactions:', error);
    }
  };
  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
    fetchAllTransactions();
    return () => {};
  }, []);


  return (
    <DashboardLayout activeMenu="Dashboard">
    <div className="my-5 mx-auto">
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <InfoCard
          icon={<IoMdCard />}
          label="Total Balance"
          value={addThousandSeparator(dashboardData?.totalBalance || 0)}
          color="bg-primary"
        />
        <InfoCard
          icon={<LuWalletMinimal />}
          label="Total Income"
          value={addThousandSeparator(dashboardData?.totalIncome|| 0)}
          color="bg-orange-500"
        />
        <InfoCard
          icon={<LuHandCoins />}
          label="Total Expense"
          value={addThousandSeparator(dashboardData?.totalExpense || 0)}
          color="bg-red-500"
        />
        
      </div>

      <div className=' gap-6 mt-6'>
        <TransactionHeatmap transactions={allTransactions} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <RecentTransactions
          transactions={dashboardData?.recentTransactions}
        />

        <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
        />
      </div>
    </div>
    </DashboardLayout>
  )
}

export default Home;