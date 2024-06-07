import { NextResponse } from "next/server";
import { Income } from "@/model/model";
import mongoose from "mongoose";
export async function POST(req)
{
    const data=await req.json();
    const id=data.id;
    const objectId = new mongoose.Types.ObjectId(id);
    
    try{
        const resp = await Income.deleteOne({_id: objectId});
        console.log("Deleted");
    }
    catch(e){console.log(e)}
    return NextResponse.json({message:"Deleted"});
}