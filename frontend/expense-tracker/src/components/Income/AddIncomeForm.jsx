import React, { useState } from 'react'
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {
    const today = new Date().toISOString().split('T')[0];
    const [income, setIncome] = useState({
        amount: '',
        source: '',
        date: today,
        icon: ''
    });

    const handleChange = (key, value) => {
        setIncome({...income, [key]: value });
    }


  return (
    <div>

        <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
        />
        <Input
        value={income.source}
        onChange={({target}) => handleChange('source', target.value)}
        placeholder="Freelance, Salary, etc."
        label="Income Source"
        type="text"
        />
        <Input
        value={income.amount}
        onChange={({target}) => handleChange('amount', target.value)}
        placeholder="Enter amount"
        label="Amount"
        type="number"
        />
        <Input
        value={income.date}
        onChange={({target}) => handleChange('date', target.value)}
        label="Date"
        type="date"
        placeholder=""
        />
        <div className='flex justify-end mt-6'>
            <button
            type='button'
            className='add-btn add-btn-fill'
            onClick={() => onAddIncome(income)}
            >
            Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm