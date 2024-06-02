"use client"
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react'
import { Progress } from '@/Components/ui/progress';
import BarchartDashboard from './_components/BarchartDashboard';
import DashboardCards from './_components/DashboardCards';
import Link from 'next/link';
import { CircleChevronRight } from 'lucide-react';
import BudgetItem from './budgets/_components/BudgetItem';
function Dashboard() {

  const { user } = useUser();
  const [BudgetList, setBudgetList] = useState();
  const [currUser, setCurrUser] = useState();
  const [latestExpense, setLatestExpense] = useState();

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
    setCurrUser(user);

  }, [user])

  useEffect(() => {
    getBudgetList();
  }, [currUser])



  const getExpenses = async () => {
    try {
      const res = await axios.post('/api/latestExpense', { user });
      const resp = res.data;
      console.log(resp);
      setLatestExpense(resp.data);
    }
    catch (e) { console.log(e); }
  }

  useEffect(() => {
    user && getExpenses();
  }, [user])



  return (
    <div className=''>
      {/* <h1 className='text-5xl font-bold mb-4 '>Dashboard</h1> */}
      {
        BudgetList?.length !== 0 ? (
          <>
            <div>
              {
                user ? <><h1 className='text-2xl md:text-4xl font-bold'>Hi, {user?.fullName} ✌️</h1>
                  <h2 className='text-sm'>You can check your budgets here...</h2>
                </> :
                  <div className='h-[50px] p-5 bg-gray-300 rounded-lg dark:bg-gray-800 animate-pulse'></div>
              }


            </div>
            {
              <div className=''>
                <DashboardCards BudgetList={BudgetList} />
              </div>
            }
            {
              latestExpense ? (
                // <div className='latestBudget mt-6'>
                //   <Link href={`/dashboard/expenses/${latestExpense._id}`} className='flex flex-col max-w-72 justify-between items-start px-2 py-3 md:p-5 hover:scale-105 transition-all duration-150 cursor-pointer bg-gray-100 dark:bg-gray-700 rounded-lg'>
                //     <div className='flex w-full mb-10 justify-between'>
                //       <div className='flex justify-start  items-center'>
                //         <h1 className=' text-4xl bg-white mr-2 rounded-full flex justify-center items-center min-w-[50px]  min-h-[50px] '>{latestExpense.icon}</h1>

                //         <div className='flex flex-col'>
                //           <h1 className=' text-sm md:text-base   font-semibold'>{latestExpense.name}</h1>
                //           {/* <h2 className='text-xs md:text-sm'>{budget.expense.length} Items </h2> */}

                //         </div>

                //       </div>

                //       <div className='flex  items-center  text-base md:text-2xl font-bold'>
                //         ₹{latestExpense.amount}
                //         <CircleChevronRight className='ml-3 ' />
                //       </div>

                //     </div>

                //     <div className='bottom flex flex-col w-full'>
                //       <div className='flex justify-between mb-2'>
                //         {/* <span className='md:text-base text-sm' >Spent: ₹ {expense}</span> */}
                //         {/* <span className='md:text-base text-sm'>Remaining: ₹{budget._doc.amount - expense}</span> */}
                //       </div>
                //       {/* <Progress value={((expense / budget._doc.amount)) * 100} /> */}
                //     </div>
                //   </Link>
                // </div>

                <>
                  <h1 className='text-xl mt-10 font-bold'>
                    Continue where you left...
                  </h1>
                  <div className="max-w-96 mt-4">
                  <BudgetItem budget={latestExpense} />
                  </div>
                </>

              ) : (
                <div className=' h-36 mt-16 rounded-lg max-w-96 animate-pulse dark:bg-slate-800 bg-gray-300'></div>
              )
            }

            <div className="chart">
              <h1 className='text-xl mt-10 font-bold'>Statistics</h1>
              <BarchartDashboard BudgetList={BudgetList} />
            </div>
            <div className="other">

            </div>
          </>
        ) : (
          <div className='  min-h-screen flex justify-center flex-col items-center'>
            {
              user && <h1 className='text-3xl'>Hello, {user.fullName} ✌️</h1>
            }
            <h2>This is your dashboard</h2>
            <h1>Create some budgets to get started</h1>

            <Link className='hover:scale-105 transition-all duration-150 flex px-7 py-5 mt-7 bg-orange-600 rounded-full ' href='/dashboard/budgets'>
              Get Started
              <CircleChevronRight className='ml-3 animate-pulse' />
            </Link>



          </div>
        )
      }


    </div>
  )
}

export default Dashboard