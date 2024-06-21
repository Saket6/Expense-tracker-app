"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'
function BudgetList() {

  const { user } = useUser();
  const [BudgetList, setBudgetList] = useState([]);
  const getBudgetList = async () => {
    try {
      const res = await axios.post('/api/getBudgetList', { user });
      const budgets = res.data;
      setBudgetList(budgets.data);
      console.log(budgets.data);
    }
    catch (e) { console.log(e); }
  }

  useEffect(() => {
    getBudgetList();
  }, [user])
  return (
    <div>
      <div className='md:py-3 flex md:flex-row flex-col md:items-center justify-between md:border-b-2 border-gray-800'>
        <div className=''>
          <h1 className='font-bold text-xl md:text-4xl'>My Budgets</h1>
          <h3 className='md:text-base text-xs'>Browse all your budgets here!!</h3>
        </div>

        <CreateBudget getBudgetList={getBudgetList} />
      </div>
      <div className="mt-4 md:py-4 budgetList grid grid-cols-1 lg:grid-cols-3 gap-5">
        {
          BudgetList?.length > 0 ? (
            BudgetList.map((budget, index) => (
              <div key={index}>
                <BudgetItem budget={budget} />
              </div>
            ))
          ) : (
            [1, 2, 3, 4, 5, 6].map((x) => {
              return (
                <div key={x} className=' bg-gray-300 dark:bg-slate-700 px-10 py-16 rounded-lg animate-pulse ' >

                </div>
              )
            })
          )
        }
      </div>
    </div>
  )
}

export default BudgetList