"use client"
import React, { useEffect } from 'react'
import { Button } from "@/Components/ui/button"
import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
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



function CreateIncome({ refresh }) {


    const [currEmoji, setEmoji] = useState('😊');
    const [isEmojiOpen, setEmojiOpen] = useState(false);
    const [IncomeName, setIncomeName] = useState("");
    const { user } = useUser();

    const { toast } = useToast()
    const createIncome = async () => {
        const res = await axios.post('/api/create_IncomeCategory', {
            IncomeName: IncomeName,
            emoji: currEmoji,
            createdBy: user?.primaryEmailAddress?.emailAddress
        })

        console.log(res.data);
        refresh();
        toast({ title: 'New Income created successfully' });
    }

    useEffect(() => {
        console.log(user?.primaryEmailAddress?.emailAddress);
    }, [user])

    return (
        <div className=''>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Create Category</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] lg:max-w-[30vw]  dark:bg-black border-2 dark:border-gray-900">
                    <DialogHeader>
                        <DialogTitle>New Income</DialogTitle>
                        <DialogDescription>
                            You can create a new Income here!!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">


                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="name" className="text-left">
                                Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g. Salary"
                                className="col-span-3 bg-transparent outline-none"
                                onChange={(e) => setIncomeName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="btn" className="text-left">
                                Icon
                            </Label>
                            <div className='absolute md:top-20 top-32 z-10 left-24 md:left-28 '>
                                {isEmojiOpen && <EmojiPicker className='z-30' height="400px" width="250px" theme='dark' onEmojiClick={(e) => { setEmoji(e.emoji); setEmojiOpen(!isEmojiOpen) }} />}
                            </div>
                            <div
                                className=" cursor-pointer hover:bg-gray-900 transition-all duration-150 min-w-full text-4xl rounded-lg border-2 border-gray-900 py-6 flex justify-center items-center "
                                onClick={() => setEmojiOpen(!isEmojiOpen)}
                            >
                                {currEmoji}
                            </div>
                            <h1 className='text-center w-full text-sm'>You can set the icon here</h1>


                        </div>


                    </div>
                    <DialogFooter>
                        <Button onClick={createIncome} type="submit" disabled={!( IncomeName)} >Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateIncome