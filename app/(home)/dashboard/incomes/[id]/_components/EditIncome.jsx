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


function EditIncome({ Income,getIncome }) {


    const [currEmoji, setEmoji] = useState("");
    const [isEmojiOpen, setEmojiOpen] = useState(false);
    const [IncomeName, setIncomeName] = useState();
    // const [Amount, setAmount] = useState();
    const { user } = useUser();

    const { toast } = useToast()


    const editIncome = async () => {
        try {
            console.log(IncomeName, currEmoji);
            const res = await axios.post('/api/edit-Income', {
                name: IncomeName,
                icon: currEmoji,
                _id: Income._doc._id
            });
            console.log(res.data);
            getIncome();
            toast({ title: 'Income updated successfully' });
        }
        catch(e){console.log(e)}
    }

    useEffect(()=>
    {
        console.log("Income", Income);
        setEmoji(Income?._doc.icon);
        setIncomeName(Income?._doc.name);
    },[Income])

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>

                    <Button variant='outline' className='rounded-lg bg-green-600 ml-3 hover:bg-green-500'>
                        Edit
                        <SquarePen color='white' className='ml-2' />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] dark:bg-black">
                    <DialogHeader>
                        <DialogTitle>Update Income</DialogTitle>
                        <DialogDescription>
                            Edit Your Income
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-rows-2 py-4">
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="name" className="">
                                Name
                            </Label>
                            {
                                Income && <Input
                                    id="name"
                                    placeholder="e.g. Grocery or Shopping"
                                    className="col-span-3 dark:bg-transparent"
                                    value={IncomeName}
                                    onChange={(e) => setIncomeName(e.target.value)}
                                />
                            }
                             <div className='absolute md:top-20 top-32 z-10 left-24 md:left-28 '>
                                {isEmojiOpen && <EmojiPicker className='z-30' height="400px" width="250px" theme='dark' onEmojiClick={(e) => { setEmoji(e.emoji); setEmojiOpen(!isEmojiOpen) }} />}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="name" className="">
                                Icon
                            </Label>
                            {
                                currEmoji && 
                                <div className='flex cursor-pointer rounded-lg justify-center items-center text-4xl hover:bg-gray-800 p-4 border-2 border-gray-800'   onClick={() => setEmojiOpen(!isEmojiOpen)}>
                                    {currEmoji}
                                </div>
                            }

                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={editIncome} type="submit" disabled={!(IncomeName)}>Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditIncome