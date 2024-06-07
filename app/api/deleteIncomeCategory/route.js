import { NextResponse } from "next/server";
import { Income } from "@/model/model";
import { IncomeCategory } from "@/model/model";

import mongoose from "mongoose";
export async function POST(req)
{
    const data=await req.json();
    const id=data.id;
    const CategoryId = new mongoose.Types.ObjectId(id);
    
    try{
        await Income.deleteMany({CategoryId:CategoryId});
        await IncomeCategory.deleteOne({_id: CategoryId});
        console.log("Deleted Budget...");
    }
    catch(e){console.log(e)}
    return NextResponse.json({message:"Deleted Budget"});
}