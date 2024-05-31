"use client"
import React, { useEffect,useState } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import TableContainer from './[id]/_components/TableContainer';
function Expenses() {

    const {user} = useUser();
    const [Expenses, setExpenses] = useState();
    const getExpenses = async()=>
    {
        try{
            const res=await axios.post('/api/get-expenseList',{user});
            const resp=res.data;
            console.log(resp);
            setExpenses(resp.data);
        }
        catch(e){console.log(e);}
    }

    useEffect(()=>
    {
        user && getExpenses();
    },[user])

  return (
    <div className='md:p-5'>
        <div className='flex flex-col'>
            <h1 className=' text-2xl md:text-4xl font-bold'>Your Expenses</h1>
            <h2 className='text-xs md:text-sm'>Find all you Expenses here...</h2>
        </div>
        <div className='mt-5'>
            {
                Expenses &&  <TableContainer expenses={Expenses} getBudget={getExpenses} flag='all'/>
            }
         
        </div>
    </div>
  )
}

export default Expenses