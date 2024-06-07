"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Progress } from "@/Components/ui/progress"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CircleChevronRight } from 'lucide-react';
import { CircleAlert } from 'lucide-react';

function CategoryItem({ category }) {

    const [latestIncome,setLatestIncome] = useState(0);
    const [totalIncome,setTotalIncome] = useState(0); 
    const [latestDate , setLatestDate] = useState();
    useEffect(()=>
    {
        const total = category?.incomes.reduce((acc,curr) => { return acc+curr.amount} , 0 )
        setTotalIncome(total);
        setLatestIncome(category?.incomes[0]?.amount)
        category.incomes.forEach((income) => income.dateCreated = income.dateCreated.split('T')[0]);
         setLatestDate(category?.incomes[0]?.dateCreated)
    },[category])
    return (
        <Link href={`/dashboard/incomes/${category?._doc._id}`} className=' p-3 md:p-4 border-2 border-gray-300 bg-gray-100 dark:bg-slate-900 flex gap-3 flex-col hover:scale-105 transition-all duration-150 dark:border-slate-700 rounded-lg'>
           <div className='flex justify-between items-center'>
                <h1 className='font-bold text-base md:text-xl '>{category?._doc.name}</h1>
                <span className='text-lg md:text-3xl p-2 bg-white rounded-full'>{category?._doc.icon}</span>
           </div>
           <div className='grid grid-cols-10 justify-between'>
                <div className='col-span-5'>
                    <h1 className='text-xs md:text-sm'>Total Income: <span className=' font-semibold'>₹{totalIncome}</span>  </h1>
                    <h1 className='text-xs md:text-base '>Latest Income: ₹{latestIncome}</h1>
                </div>
                <div className='col-span-5 flex justify-end items-end'>
                    {
                        latestDate?  <h1 className='md:text-base text-xs text-right'> {latestDate} </h1>:'Date: -'
                    }
                  
                </div>
           </div>
        </Link>
    )
}

export default CategoryItem