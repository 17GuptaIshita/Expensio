import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
}


export const getInitials = (name) => {
if (!name) return '';
const words = name.split(' ');
let initials = '';

for (let i = 0; i < Math.min(words.length,2); i++) {
  initials+=words[i][0];
}

return initials.toUpperCase();
};

export const addThousandSeparator = (num) => {
  if(num=== null || isNaN(num)) return '';
  const [integerPart, fractionalPart] = num.toString().split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return fractionalPart 
  ? `${formattedInteger}.${fractionalPart}` 
  : formattedInteger;
};


export const prepareExpenseBarChartData = (data = []) => {
  // Group by formatted date and sum amounts, collect categories
  const grouped = {};
  data.forEach(item => {
    const dateKey = moment(item.date).format('DD-MMM');
    if (!grouped[dateKey]) {
      grouped[dateKey] = { amount: 0, categories: [] };
    }
    grouped[dateKey].amount += Number(item.amount);
    if (item.category) grouped[dateKey].categories.push(item.category);
  });

  // Convert to array and sort by date ascending
  const chartData = Object.entries(grouped)
    .map(([category, { amount, categories }]) => ({ category, amount, categories }))
    .sort((a, b) => moment(a.category, 'DD-MMM').toDate() - moment(b.category, 'DD-MMM').toDate());

  return chartData;
};

export const prepareIncomeBarChartData = (data=[]) => {
  // Group by formatted date and sum amounts, collect sources
  const grouped = {};
  data.forEach(item => {
    const dateKey = moment(item.date).format('DD-MMM');
    if (!grouped[dateKey]) {
      grouped[dateKey] = { amount: 0, sources: [] };
    }
    grouped[dateKey].amount += Number(item.amount);
    if (item.source) grouped[dateKey].sources.push(item.source);
  });

  // Convert to array and sort by date ascending
  const chartData = Object.entries(grouped)
    .map(([category, { amount, sources }]) => ({ category, amount, sources }))
    .sort((a, b) => moment(a.category, 'DD-MMM').toDate() - moment(b.category, 'DD-MMM').toDate());
  return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {
  return data
    .map(item => ({
      category: item.category,
      amount: Number(item.amount),
      date: moment(item.date).format('DD MMM'),
      rawDate: moment(item.date).toDate() 
    }))
    .sort((a, b) => a.rawDate - b.rawDate)
    .map(({ rawDate, ...rest }) => rest); 
};