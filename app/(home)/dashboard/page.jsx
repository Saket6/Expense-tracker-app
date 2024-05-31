"use client"
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react'
import BarchartDashboard from './_components/BarchartDashboard';
import DashboardCards from './_components/DashboardCards';
import Link from 'next/link';
import { CircleChevronRight } from 'lucide-react';
function Dashboard() {

  const { user } = useUser();
  const [BudgetList, setBudgetList] = useState();
  const [currUser, setCurrUser] = useState();

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



  return (
    <div className=''>
      {/* <h1 className='text-5xl font-bold mb-4 '>Dashboard</h1> */}
      {
        BudgetList?.length !== 0 ? (
          <>
            <div>
              {
                user ? <><h1 className='text-2xl md:text-4xl font-bold text-white'>Hi, {user?.fullName} ✌️</h1>
                  <h2 className='text-sm'>You can check your budgets here...</h2>
                </> :
                  <div className='h-[50px] p-5 bg-gray-800 animate-pulse'></div>
              }


            </div>
            {
              <div className=''>
                <DashboardCards BudgetList={BudgetList} />
              </div>
            }
            <div className="chart">
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
                <CircleChevronRight className='ml-3 animate-pulse'/>
                </Link>
              


          </div>
        )
      }


    </div>
  )
}

export default Dashboard