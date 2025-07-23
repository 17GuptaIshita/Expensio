import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import  API_PATHS  from '../../utils/ApiPaths';
import IncomeOverview from '../../components/Income/IncomeOverview';
import RecentIncomeWithChart from '../../components/Income/RecentIncomeWithChart';
import useUserAuth from '../../hooks/useUserAuth';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import { toast } from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert , setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error('Error fetching income data:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({show: false, data: null});
        toast.success("Income deleted successfully."),
        fetchIncomeDetails();
      
    } catch (error) {
      console.error('Error deleting income:', error);    }
  };

  const handleAddIncome = async (income) => {
    const {source, amount, date, icon} = income;

    if(!source.trim())
    {
      toast.error("Please enter a valid source.");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if(!date) {
      toast.error("Please select a valid date.");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      });
      setOpenAddIncomeModel(false);
      toast.success("Income added successfully.");
      fetchIncomeDetails();
    }
    catch (error) {
      console.error('Error adding income:', error);
    }

  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Income.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading income details:', error);
      toast.error("Failed to download income details.");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
    <div className="my-5 mx-auto">
      <div className='grid grid-cols-1 gap-6'>
        <IncomeOverview 
          transactions={incomeData}
          onAddIncome={() => setOpenAddIncomeModel(true)}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <RecentIncomeWithChart
            data={incomeData?.slice(0,4) || []}
            totalIncome={incomeData?.reduce((acc, curr) => acc + (curr.amount || 0), 0) || 0}
          />
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id
              });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
      </div>
      <Modal
        isOpen={openAddIncomeModel}
        onClose={() => setOpenAddIncomeModel(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Income"
      >
        <DeleteAlert
        content="Are you sure you want to delete this income?"
        onDelete={() => {
          deleteIncome(openDeleteAlert.data);}}
        />
      </Modal>
      </div>
      </DashboardLayout>
    
  )
}


export default Income;