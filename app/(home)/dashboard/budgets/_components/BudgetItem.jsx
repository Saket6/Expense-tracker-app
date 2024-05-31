"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Progress } from "@/Components/ui/progress"
import Link from 'next/link'

function BudgetItem({ budget }) {

    const [expense, setExpense] = useState();
    useEffect(() => {
        let sum = 0;
        budget.expense.forEach(element => {
            sum += element.amount;
        });
        setExpense(sum);
    }, [budget])
    return (
        <Link href={`/dashboard/expenses/${budget._doc._id}`} className='flex flex-col justify-between items-start px-2 py-3 md:p-5 hover:scale-105 transition-all duration-150 cursor-pointer bg-slate-700 rounded-lg'>
            <div className='flex w-full mb-10 justify-between'>
                <div className='flex justify-start  items-center'>
                  
                        <h1 className=' text-4xl bg-white mr-2 rounded-full flex justify-center items-center min-w-[50px]  min-h-[50px] '>{budget._doc.icon}</h1>
                    
                        <div className='flex flex-col'>
                        <h1 className=' text-sm md:text-base   font-semibold'>{budget._doc.name}</h1>
                        <h2 className='text-xs md:text-sm'>{budget.expense.length } Items </h2>

                        </div>
                  
                </div>

                <div className='flex items-center  text-base md:text-2xl text-green-400'>
                    ₹{budget._doc.amount}
                </div>

            </div>

            <div className='bottom flex flex-col w-full'>
            <div className='flex justify-between mb-2'>
                <span className='md:text-base text-sm' >Spent: ₹ {expense}</span>
                <span className='md:text-base text-sm'>Remaining: ₹{budget._doc.amount-expense}</span>
            </div>
            <Progress value={((expense/budget._doc.amount))*100} />
            </div>
        </Link>
    )
}

export default BudgetItem