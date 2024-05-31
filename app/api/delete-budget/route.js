import { NextResponse } from "next/server";
import { Expense } from "@/model/model";
import { NewBudget } from "@/model/model";

import mongoose from "mongoose";
export async function POST(req)
{
    const data=await req.json();
    const id=data.id;
    const budgetObjectId = new mongoose.Types.ObjectId(id);
    
    try{
        await Expense.deleteMany({budgetId:budgetObjectId});
        await NewBudget.deleteOne({_id: budgetObjectId});
        console.log("Deleted Budget...");
    }
    catch(e){console.log(e)}
    return NextResponse.json({message:"Deleted Budget"});
}