import connect from "@/db/connect"
import { NextResponse } from "next/server";
import { IncomeCategory } from "@/model/model";
import mongoose from "mongoose";

connect();
export async function POST(req)
{
    try{
        const data=await req.json();
        const {name,icon,_id} = data;
        const id = new mongoose.Types.ObjectId(_id);
        console.log(name,icon,id);
        const updatedBudget = await IncomeCategory.updateOne({_id:id},{$set:{name,icon}});
    }
    catch(e){console.log(e);}
    
    return NextResponse.json({message:"Success"});
}

