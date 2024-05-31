"use client"
import React, { useEffect } from 'react'
import { Button } from "@/Components/ui/button"
import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { SquarePen } from 'lucide-react'
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


function EditBudget({ budget,getBudget }) {


    const [currEmoji, setEmoji] = useState("");
    const [isEmojiOpen, setEmojiOpen] = useState(false);
    const [budgetName, setBudgetName] = useState();
    const [Amount, setAmount] = useState();
    const { user } = useUser();

    const { toast } = useToast()


    const editBudget = async () => {
        try {
            console.log(budgetName, Amount, currEmoji);
            const res = await axios.post('/api/edit-budget', {
                name: budgetName,
                amount: Amount,
                icon: currEmoji,
                _id: budget._doc._id
            });
            console.log(res.data);
            getBudget();
            toast({ title: 'Budget updated successfully' });
        }
        catch(e){console.log(e)}
    }

    useEffect(()=>
    {
        console.log("Budget", budget);
        setEmoji(budget?._doc.icon);
        setBudgetName(budget?._doc.name);
        setAmount(budget?._doc.amount);
    },[budget])

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>

                    <Button variant='outline' className='rounded-lg bg-green-600 ml-3 hover:bg-green-500'>
                        Edit
                        <SquarePen color='white' className='ml-2' />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                        <DialogDescription>
                            Edit Your Budget
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Button className='w-fit text-3xl' onClick={() => setEmojiOpen(!isEmojiOpen)} >{currEmoji}
                        </Button>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            {
                                budget && <Input
                                    id="name"
                                    placeholder="e.g. Grocery or Shopping"
                                    className="col-span-3"
                                    value={budgetName}
                                    onChange={(e) => setBudgetName(e.target.value)}
                                />
                            }

                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <div className='absolute top-20 left-24 md:left-32 z-30'>
                                {isEmojiOpen && <EmojiPicker theme='dark' height="400px" width="250px" onEmojiClick={(e) => { setEmoji(e.emoji); setEmojiOpen(!isEmojiOpen) }} />}
                            </div>
                            {
                                budget && <Input
                                    id="amount"
                                    type="Number"
                                    placeholder="e.g. ₹1000"
                                    value={Amount}
                                    className="col-span-3"
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            }

                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={editBudget} type="submit" disabled={!(Amount && budgetName)}>Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget