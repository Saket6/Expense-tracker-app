import React from 'react'
import { useEffect, useState } from 'react';
import { PiggyBank } from 'lucide-react';
import { Receipt } from 'lucide-react';
import { Box } from 'lucide-react';
import { CreditCard } from 'lucide-react';
import { WalletCards } from 'lucide-react';

function DashboardCards({ BudgetList , IncomeCategories }) {


    const [totalBudget, setTotalBudget] = useState();
    const [totalSpent, setTotalSpent] = useState();
    const [Balance, setBalance] = useState();
    const [details , setDetails] = useState({});
    const [totalIncome , setTotalIncome] = useState();
    useEffect(() => {
        let curr_budget = 0;
        let spent = 0;

        BudgetList?.forEach((budget) => {
            curr_budget += budget._doc.amount;
            budget.expense?.forEach((expense) => {
                spent += expense.amount;
            })
        })

       
        setTotalBudget(curr_budget);
        setTotalSpent(spent);
    }, [BudgetList])

    useEffect(()=>
    {
        let totIncome = 0;
        IncomeCategories?.forEach((category)=>
        {
            let income = category.incomes.reduce((acc,curr)=>{ return acc + curr.amount} , 0);
            totIncome = totIncome + income;
        })

      
        setTotalIncome(totIncome);
    },[IncomeCategories])

    useEffect(()=>
    {   
        setBalance(totalIncome - totalSpent);
     
    },[totalIncome , totalSpent])

    useEffect(()=>
    {
        setDetails({
            income: totalIncome?.toLocaleString('en-US'),
            spent: totalSpent?.toLocaleString('en-US'),
            Balance: Balance?.toLocaleString('en-US')
        })
    },[totalSpent , totalIncome, Balance])
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 mt-4 gap-4 justify-center items-center'>
            {
                BudgetList?.length > 0 ?
                    <>
                        {/* <div className="flex justify-between items-center px-5 md:px-10 py-4  md:py-6 rounded-lg bg-gray-300 dark:bg-gray-700 ">
                            <div>
                                <h3 className='font-bold text-base md:text-lg'>Total Budget</h3>
                                <h1 className='font-bold text-xl md:text-4xl'>₹ {totalBudget}</h1>
                            </div>
                            <div>
                                <h1 className='p-2 hidden md:block bg-white rounded-full'><PiggyBank size={"40px"} color='black' /></h1>
                                <h1 className='p-2 md:hidden block bg-white rounded-full'><PiggyBank size={"25px"} color='black' /></h1>

                            </div>

                        </div> */}
                        <div className="grid grid-cols-10 justify-between items-center px-5 md:px-10 py-4  md:py-6 rounded-lg bg-gray-100 dark:bg-gray-900 dark:border-2 dark:border-gray-800  ">
                            <div className='col-span-2'>
                                <h1 className='p-2 hidden w-fit  md:block bg-green-500 bg-opacity-10 rounded-lg'><PiggyBank size={"40px"} color='#17c700' /></h1>
                                <h1 className='p-2 w-fit md:hidden block bg-green-500 bg-opacity-10 rounded-full'><PiggyBank size={"25px"} color='#17c700' /></h1>

                            </div>
                            <div className='col-span-8'>
                                <h3 className=' text-base md:text-lg'>Income</h3>
                                <h1 className='font-bold text-xl md:text-4xl'>₹ {details.income}</h1>
                            </div>

                        </div>

                        <div className="grid grid-cols-10 justify-between items-center px-5 md:px-10 py-4  md:py-6 rounded-lg bg-gray-100 dark:bg-gray-900 dark:border-2 dark:border-gray-800  ">
                            <div className='col-span-2'>
                                <h1 className='p-2 hidden w-fit  md:block bg-red-500 bg-opacity-10 rounded-lg'><Receipt size={"40px"} color='#e00000' /></h1>
                                <h1 className='p-2 w-fit md:hidden block bg-red-500 bg-opacity-10 rounded-full'><Receipt size={"25px"} color='#e00000' /></h1>

                            </div>
                            <div className='col-span-8'>
                                <h3 className=' text-base md:text-lg'>Expense</h3>
                                <h1 className='font-bold text-xl md:text-4xl'>₹ {details.spent}</h1>
                            </div>

                        </div>
                        <div className="grid grid-cols-10 justify-between items-center px-5 md:px-10 py-4  md:py-6 rounded-lg bg-gray-100 dark:bg-gray-900 dark:border-2 dark:border-gray-800  ">
                            <div className='col-span-2'>
                                <h1 className='p-2 hidden w-fit  md:block bg-blue-500 bg-opacity-10 rounded-lg'><CreditCard size={"50px"} color='#0074e0' /></h1>
                                <h1 className='p-2 w-fit md:hidden block bg-blue-500 bg-opacity-10 rounded-full'><CreditCard size={"25px"} color='#0074e0' /></h1>

                            </div>
                            <div className='col-span-8'>
                                <h3 className=' text-base md:text-lg'>Balance</h3>
                                <h1 className='font-bold text-xl md:text-4xl'>₹ {details.Balance}</h1>
                            </div>

                        </div>

                        <div className="grid grid-cols-10 justify-between items-center px-5 md:px-10 py-4  md:py-6 rounded-lg bg-gray-100 dark:bg-gray-900 dark:border-2 dark:border-gray-800  ">
                            <div className='col-span-2'>
                                <h1 className='p-2 hidden w-fit  md:block bg-yellow-500 bg-opacity-10 rounded-lg'><WalletCards size={"40px"} color='#e0d900' /></h1>
                                <h1 className='p-2 w-fit md:hidden block bg-yellow-500 bg-opacity-10 rounded-full'><WalletCards size={"25px"} color='#e0d900' /></h1>

                            </div>
                            <div className='col-span-8'>
                                <h3 className=' text-base md:text-lg'>No. of Budgets</h3>
                                <h1 className='font-bold text-xl md:text-4xl'>₹ {BudgetList.length}</h1>
                            </div>

                        </div>
                    </>
                    :
                    <>
                        {
                            [1, 2, 3].map((item) =>
                            (
                                <div className='px-4 py-6 h-[120px] rounded-lg animate-pulse bg-gray-300 dark:bg-gray-800' key={item}></div>

                            )
                            )
                        }

                    </>






            }

        </div>
    )
}

export default DashboardCards