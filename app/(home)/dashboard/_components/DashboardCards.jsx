import React from 'react'
import { useEffect, useState } from 'react';
import { PiggyBank } from 'lucide-react';
import { Receipt } from 'lucide-react';
import { Box } from 'lucide-react';
function DashboardCards({ BudgetList }) {


    const [totalBudget, setTotalBudget] = useState();
    const [totalSpent, setTotalSpent] = useState();

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

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 mt-4 gap-4 justify-center items-center'>
            {
                BudgetList?.length > 0 ?
                    <>
                        <div className="flex justify-between items-center px-5 md:px-10 py-4  md:py-6 rounded-lg bg-gray-300 dark:bg-gray-700 ">
                            <div>
                                <h3 className='font-bold text-base md:text-lg'>Total Budget</h3>
                                <h1 className='font-bold text-xl md:text-4xl'>₹ {totalBudget}</h1>
                            </div>
                            <div>
                                <h1 className='p-2 hidden md:block bg-white rounded-full'><PiggyBank size={"40px"} color='black' /></h1>
                                <h1 className='p-2 md:hidden block bg-white rounded-full'><PiggyBank size={"25px"} color='black' /></h1>

                            </div>

                        </div>

                        <div className="flex justify-between items-center px-5 md:px-10 py-4 md:py-6 rounded-lg bg-gray-300 dark:bg-gray-700 ">
                            <div>
                                <h3 className='font-bold text-base md:text-lg'>Total Expenses</h3>
                                <h1 className='font-bold text-xl md:text-4xl'>₹ {totalSpent}</h1>
                            </div>
                            <div>
                                <h1 className='p-2 hidden md:block bg-white rounded-full'><Receipt size={"40px"} color='black' /></h1>
                                <h1 className='p-2 md:hidden bg-white rounded-full'><Receipt size={"25px"} color='black' /></h1>

                            </div>

                        </div>

                        <div className="flex justify-between items-center px-5 md:px-10 py-4 md:py-6 rounded-lg bg-gray-300 dark:bg-gray-700 ">
                            <div>
                                <h3 className='font-bold text-base md:text-lg'>No. of Budgets</h3>
                                <h1 className='font-bold text-xl md:text-4xl'>{BudgetList.length}</h1>
                            </div>
                            <div>
                                <h1 className='p-2 hidden md:block bg-white rounded-full'><Box size={"40px"} color='black' /></h1>
                                <h1 className='p-2 md:hidden bg-white rounded-full'><Box size={"25px"} color='black' /></h1>

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