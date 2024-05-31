"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'
function BudgetList() {

  const {user} = useUser();
  const [BudgetList,setBudgetList] = useState([]);
  const getBudgetList = async () => {
    try{
      const res = await axios.post('/api/getBudgetList',{user});
      const budgets = res.data;
      setBudgetList(budgets.data);
      console.log(budgets.data);
    }
    catch(e){console.log(e);}
  }

  useEffect(()=>
  {
    getBudgetList();
  },[user])
  return (
    <div>
        <CreateBudget getBudgetList={getBudgetList}/>
        <div className="mt-4 md:p-8 budgetList grid grid-cols-1 lg:grid-cols-3 gap-5">
            {
              BudgetList?.length>0?(
                BudgetList.map((budget,index)=>(
                  <div key={index}>
                    <BudgetItem budget={budget}/>
                  </div>
                ))
              ):(
                [1,2,3,4,5,6].map((x)=>
                {
                  return(
                    <div key={x} className='bg-slate-700 px-10 py-16 rounded-lg animate-pulse ' >
                      
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