"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import CategoryItem from '../_components/CategoryItem';
import axios from 'axios';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button'
import IncomeTableContainer from './_components/IncomeTableContainer';
import { useToast } from '@/Components/ui/use-toast';
import { Trash2 } from 'lucide-react';
import EditIncome from './_components/EditIncome';
import { Calendar } from '@/Components/ui/calendar';
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
import { DatePickerDemo } from '@/Components/DatePicker';
function Income({ params }) {

  const { toast } = useToast()
  const { user } = useUser();
  const [Income, setIncome] = useState()
  const Router = useRouter();
  const [IncomeName, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState();

  const getIncome = async () => {
    try {
      const res = await axios.post('/api/incomeInfo', {
        user,
        id: params
      });
      const Incomes = res.data;
        console.log("This is income yay", Incomes);
      Incomes.data[0].incomes.forEach((income) => income.dateCreated = income.dateCreated.split('T')[0]);
      setIncome(Incomes.data[0]);
      // console.log("this is data", Incomes.data);
    }
    catch (e) { console.log(e); }
  }

  const submitIncome = async () => {
    try {

      const res = await axios.post('/api/create-income', {
        name: IncomeName,
        CategoryId: Income._doc._id,
        amount: amount,
        dateCreated: date
      })

      // console.log(res.data);
      getIncome();
      toast({ title: 'New Income created successfully' });

    }
    catch (e) { console.log(e); }
  }

  const deleteIncome = async () => {
    console.log("DELETED Income", Income._doc._id);
    try {
      const res = await axios.post('/api/deleteIncomeCategory', { id: Income._doc._id })
      console.log(res.data);
      Router.push('/dashboard/incomes')
      toast({ title: 'Income deleted successfully' });
    }
    catch (e) { console.log(e) }
  }

  useEffect(() => {
    getIncome();
  }, [user, params])



  return (
    <div>
      <h1 className=' text-2xl md:text-4xl font-bold mb-4'>My Income</h1>
      <div className='flex flex-col '>
        <div className="top grid grid-cols-1 md:grid-cols-12 ">
          <div className="tl col-span-6">
            {
              Income ? <div className='mt-5 lg:mt-0'> <CategoryItem category={Income} /> </div> : (
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
                      Income and remove the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteIncome} >Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>


              <EditIncome Income={Income} getIncome={getIncome} />
            </div>
          </div>
          <div className='tr col-span-6 flex flex-col justify-start items-center border-1 rounded-lg bg-white dark:bg-slate-950  md:mx-10 '>
            <h1 className='text-xl font-bold md:mt-3 mb-1 md:mb-5 mt-10'> Add new Income</h1>
            <div className='flex flex-col w-full py-5 md:p-5  ' >
              <div>
                <Label htmlFor='name'  >Income Name</Label>
                <Input id='name' className='mt-2' placeholder="e.g.Monthly Salary" onChange={(e) => { setName(e.target.value) }} />
              </div>

              <div>
                <Label htmlFor='amount'  >Amount</Label>
                <Input id='amount' className='mt-2' placeholder="e.g.40000" onChange={(e) => { setAmount(e.target.value) }} />
              </div>


              <div className='mt-3'>
                <Label htmlFor='date' className='mr-3'  >Date:</Label>
                <Input type='date' id='date' value={date} placeholder='' onChange={(e) => setDate(e.target.value)}></Input>
                {/* <DatePickerDemo date={date} setDate={setDate}/> */}
              </div >

              <div className='mt-5'>
                <Button className='w-full' disabled={!(IncomeName)} onClick={submitIncome} >Create new Income</Button>
              </div>


            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className='mb-3 text-xl font-bold'>Latest Incomes</h1>
          {
            Income ? <IncomeTableContainer Incomes={Income?.incomes} getIncome={getIncome} /> : ("")
          }

        </div>

      </div>
    </div>
  )
}

export default Income