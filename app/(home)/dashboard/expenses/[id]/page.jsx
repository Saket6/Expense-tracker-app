"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_components/BudgetItem';
import axios from 'axios';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button'
import TableContainer from './_components/TableContainer';
import { useToast } from '@/Components/ui/use-toast';
import { Trash2 } from 'lucide-react';
import EditBudget from './_components/EditBudget';
import { SquarePen } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
function Expenses({ params }) {

  const { id } = params;
  const { toast } = useToast()
  const { user } = useUser();
  const [budget, setBudget] = useState()
  const Router = useRouter();
  const [expenseName, setName] = useState("");
  const [expenseAmount, setAmount] = useState();

  const getBudget = async () => {
    try {
      const res = await axios.post('/api/budgetInfo', {
        user,
        id: params
      });
      const budgets = res.data;
      setBudget(budgets.data[0]);
      console.log(budgets.data);
    }
    catch (e) { console.log(e); }
  }

  const submitExpense = async () => {
    // console.log(expenseName);
    // console.log(expenseAmount);
    try {

      const res = await axios.post('/api/createExpense', {
        name: expenseName,
        amount: expenseAmount,
        budgetId: budget._doc._id,
      })

      // console.log(res.data);
      getBudget();
      toast({ title: 'New expense created successfully' });

    }
    catch (e) { console.log(e); }
  }

  const deleteBudget = async()=>
    {
      console.log("DELETED BUDGET" , budget._doc._id);
      try{
        const res = await axios.post('/api/delete-budget',{id: budget._doc._id})
        console.log(res.data);
        Router.push('/dashboard/budgets')
        toast({title: 'Budget deleted successfully'});
      }
      catch(e){console.log(e)}
    }

  useEffect(() => {
    getBudget();
  }, [user, params])



  return (
    <div>
      <h1 className=' text-2xl md:text-4xl font-bold mb-4'>My Expenses</h1>
      <div className='flex flex-col '>
        <div className="top grid grid-cols-1 md:grid-cols-12 ">
          <div className="tl col-span-6">
            {
              budget ? <div className='mt-5 lg:mt-0'> <BudgetItem budget={budget} /> </div> : (
                <div className='px-10 py-20 rounded-lg bg-gray-400 dark:bg-gray-700 animate-pulse' >
                </div>
              )
            }
            <div className='mt-4 flex'>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button variant='outline' className='rounded-lg bg-red-600 hover:bg-red-500'>
                   Delete
                <Trash2 color='white' className='ml-2' />
              </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      budget and remove the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteBudget} >Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              

             <EditBudget budget={budget} getBudget={getBudget}/>
            </div>
          </div>
          <div className='tr col-span-6 flex flex-col justify-start items-center border-1 rounded-lg bg-white dark:bg-gray-900  md:mx-10 '>
            <h1 className='text-xl font-bold md:mt-3 mb-1 md:mb-5 mt-10'> Create New Expense</h1>
            <div className='flex flex-col w-full py-5 md:p-5  ' >
              <div>
                <Label htmlFor='name'  >Expense Name</Label>
                <Input id='name' className='mt-2' placeholder="e.g.Decoration" onChange={(e) => { setName(e.target.value) }} />
              </div>

              <div>
                <Label htmlFor='amount'  >Expense Amount</Label>
                <Input id='amount' className='mt-2' placeholder="e.g.₹2000" onChange={(e) => { setAmount(e.target.value) }} />
              </div>

              <div className='mt-5'>
                <Button className='w-full' disabled={!(expenseName && expenseAmount)} onClick={submitExpense} >Create new Expense</Button>
              </div>


            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className='mb-3 text-xl font-bold'>Latest Expenses</h1>
          {
            budget ? <TableContainer expenses={budget.expense} getBudget={getBudget} /> : ("")
          }

        </div>

      </div>
    </div>
  )
}

export default Expenses