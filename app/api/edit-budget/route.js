import connect from "@/db/connect"
import { NextResponse } from "next/server";
import {NewBudget} from "@/model/model";
import mongoose from "mongoose";

connect();
export async function POST(req)
{
    try{
        const data=await req.json();
        const {name,amount,icon,_id} = data;
        const id = new mongoose.Types.ObjectId(_id);
        console.log(name,amount,icon,id);
        const updatedBudget = await NewBudget.updateOne({_id:id},{$set:{name,amount,icon}});
    }
    catch(e){console.log(e);}
    
    return NextResponse.json({message:"Success"});
}

