import React, { useEffect, useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function MonthlyYearlyChart({ expenseList, theme }) { // Add theme prop

  const formatDate = (date) => {
    const newDate = new Date(date);
    return {
      month: newDate.toLocaleDateString('en-US', { month: 'short' }), // Short month name
      year: newDate.getFullYear(),
    };
  };

  const [expensesByYearMonth, setExpensesByYearMonth] = useState([]); // Use state for grouped data with initial empty array

  useEffect(() => {
    if (expenseList) {
      const allMonths = [...Array(12).keys()].map((i) => ({
        month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
        year: 2024,
        amount: 0,
      }));

      const groupedData = expenseList.reduce((acc, expense) => {
        const { month, year } = formatDate(expense.dateCreated);
        const existingIndex = acc.findIndex(item => item.month === month && item.year === year);
        if (existingIndex !== -1) {
          acc[existingIndex].amount += expense.amount;
        } else {
          acc.push({ month, year, amount: expense.amount });
        }
        return acc;
      }, allMonths);
      setExpensesByYearMonth(groupedData);
    }
  }, [expenseList]);

  useEffect(()=>
  {
    console.log("This is the data",expensesByYearMonth);
  },[expensesByYearMonth])

  const data = expensesByYearMonth; 

  const chartColors = theme === 'dark' ? {
    backgroundColor: '#282c34', // Dark background
    gridColor: '#3f474e',  // Grid lines
    axisColor: '#ccc',     // Text color for axis labels
  } : {
    backgroundColor: '#fff', // Light background
    gridColor: '#eee',      // Grid lines
    axisColor: '#333',     // Text color for axis labels
  };

  return (
    <div className='h-[300px] md:h-[400px] mx-[-20px] md:w-[1000px] mt-5'>
      <ResponsiveContainer  >
        {
          data.length > 0 ? ( 
            <BarChart className=' p-4' width={800} height={400} data={data} stacked  
            >
              <XAxis dataKey="month" tick={{ stroke: chartColors.axisColor }} />  
              <YAxis tick={{ stroke: chartColors.axisColor }} />                
              <CartesianGrid  strokeDasharray="1 6"/>                
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="amount" stackId="a" fill="#FFDB00" name="Total Expenses" />
            </BarChart>
          ) : (
            <div className='ml-4'>No History</div> 
          )
        }
      </ResponsiveContainer >
    </div>
  )
}

export default MonthlyYearlyChart;