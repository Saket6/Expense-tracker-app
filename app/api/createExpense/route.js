import { Expense } from "@/model/model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(req)
{
    const data = await req.json();
    const {name, amount , budgetId} = data;
    console.log(name, amount, budgetId);
    const objectBudgetId =  new mongoose.Types.ObjectId(budgetId);

    
    try{
        const newExpense = new Expense({name, amount, budgetId:objectBudgetId});
        await newExpense.save();
        console.log(newExpense);
    }
    catch(e){console.log(e);
        return NextResponse.json("Error");
    }

    return NextResponse.json("Success");
}