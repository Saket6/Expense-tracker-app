import connect from "@/db/connect"
import { NextResponse } from "next/server";
import {NewBudget} from "@/model/model";

connect();
export async function POST(req)
{
    const data=await req.json();
    const newBudget = new NewBudget({
        name:data.budgetName,
        amount:data.Amount,
        icon: data.emoji,
        createdBy: data.createdBy,
    }); 

    // console.log(newBudget);
    await newBudget.save();
    return NextResponse.json("Success");
}

