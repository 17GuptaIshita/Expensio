import React, { useEffect, useState } from 'react';
import useUserAuth from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import API_PATHS from '../../utils/ApiPaths'; 
import { toast } from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview'; 
import Last30DaysExpenses from '../../components/Expense/Last30DaysExpenses';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });

  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
  
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error('Error fetching expense data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;  
    if (!category.trim()) {
      toast.error("Please enter a valid category.");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    if (!date) {
      toast.error("Please select a valid date.");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModel(false);
      toast.success("Expense added successfully.");
      fetchExpenseDetails();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully.");
      fetchExpenseDetails();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleDownloadExpenseDetails = async () => { 
    try{
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob', // Important for downloading files
      });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Expenses.xlsx'); // Set the file name
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    }
    catch (error) {
      console.error('Error downloading expense details:', error);
      toast.error("Failed to download expense details.");
    }
   };


  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []); 

  return (
    <DashboardLayout activeMenu="Expense">
    <div className="my-5 mx-auto">
      <div className='grid grid-cpls-1 gap-6'>
        <div className="">
        <ExpenseOverview transactions={expenseData}
          onExpenseIncome={()=> setOpenAddExpenseModel(true)} />  
        <Last30DaysExpenses
          data={expenseData || []}
        />
        </div>
        <ExpenseList
        transactions={expenseData}
        onDelete={(id)=>{
          setOpenDeleteAlert({
            show: true,
            data: id
          });
        }}
        onDownload={handleDownloadExpenseDetails}
        />
      </div>
      <Modal
        isOpen={openAddExpenseModel}
        onClose={() => setOpenAddExpenseModel(false)}
        title="Add Expense"
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
          />
        </Modal>
      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Expense"
        >
          <DeleteAlert
          content="Are you sure you want to delete this expense?"
          onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
    </div>
    </DashboardLayout>
  )
}
export default Expense;