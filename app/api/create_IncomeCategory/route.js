import connect from "@/db/connect"
import { NextResponse } from "next/server";
import { IncomeCategory } from "@/model/model";

connect();
export async function POST(req)
{
    const data=await req.json();
    const newCategory = new IncomeCategory({
        name:data.IncomeName,
        icon: data.emoji,
        createdBy: data.createdBy,
    }); 

    // console.log(newBudget);
    await newCategory.save();
    return NextResponse.json("Success");
}