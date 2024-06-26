"use client"
import React, { useEffect } from 'react'
import { Button } from "@/Components/ui/button"
import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { CirclePlus } from 'lucide-react';
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { useUser } from '@clerk/nextjs'
import { useToast } from '@/Components/ui/use-toast'



function CreateBudget({getBudgetList}) {


    const [currEmoji, setEmoji] = useState('😊');
    const [isEmojiOpen, setEmojiOpen] = useState(false);
    const [budgetName, setBudgetName] = useState("");
    const [Amount, setAmount] = useState();
    const {user}=useUser();

    const {toast} = useToast()
    const createBudget=async ()=>
    {
        const res=await axios.post('/api/create-budget',{
            budgetName:budgetName,
            Amount:Amount,
            emoji:currEmoji,
            createdBy: user?.primaryEmailAddress?.emailAddress
        })
        
        console.log(res.data);
        getBudgetList();
        toast({title: 'New budget created successfully'});
    }

    useEffect(()=>
    {
        console.log(user?.primaryEmailAddress?.emailAddress);
    },[user])

    return (
        <div className='mt-5'>
            <Dialog>
                <DialogTrigger asChild>
                    <div className=' cursor-pointer px-3 py-2 md:py-3 md:px-3 transition-all duration-150 hover:bg-orange-500 bg-neutral-800 text-white dark:text-white dark:bg-orange-600 w-fit flex  justify-center items-center rounded-full' >
                        {/* <span className=' font-bold text-xl md:text-3xl mr-3'>+</span> */}
                        <h3 className='font-bold text-sm md:text-base'>New Budget</h3>
                        <CirclePlus className='ml-1'/>
                    </div>
                </DialogTrigger>
                <DialogContent  className="max-w-[90vw] lg:max-w-max   dark:bg-black border-2 dark:border-gray-900">
                    <DialogHeader>
                        <DialogTitle>New Budget</DialogTitle>
                        <DialogDescription>
                            You can create a new Budget here!!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Button className='w-min h-max bg-gray-300 hover:bg-gray-200   dark:hover:bg-gray-800 dark:bg-slate-800 text-3xl' onClick={() => setEmojiOpen(!isEmojiOpen)} >{currEmoji}
                        </Button>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g. Grocery or Shopping"
                                className="col-span-3 bg-transparent"
                                onChange={(e) => setBudgetName(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <div className='absolute md:top-20 top-32 z-10 left-24 md:left-28 '>
                                {isEmojiOpen && <EmojiPicker className='z-30' height="400px" width="250px" theme='dark' onEmojiClick={(e) => { setEmoji(e.emoji); setEmojiOpen(!isEmojiOpen) }} />}
                            </div>
                            <Input
                                id="amount"
                                type="Number"
                                placeholder="e.g. ₹1000"
                                className="col-span-3 bg-transparent"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={createBudget}  type="submit" disabled={!(Amount && budgetName)} >Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateBudget