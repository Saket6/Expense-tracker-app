import connect from "@/db/connect"
import { NextResponse } from "next/server";
import { Income } from "@/model/model";
import { IncomeCategory } from "@/model/model";
import mongoose from "mongoose";
connect();
export async function POST(req)
{
    try{
        const data=await req.json();
        const user = data.user;
        const id = data.id;
        const objectId = new mongoose.Types.ObjectId(id);
        const Category = await IncomeCategory.find({_id: objectId});
        const Incomes = await  Income.find({ CategoryId: objectId}).sort({_id:-1});

       const CategoryWithIncomes=Category.map(category => ({
        ...category,
        incomes: Incomes
       }))

    //    console.log(CategoryWithIncomes);
        return NextResponse.json({"message":'success', "data": CategoryWithIncomes});
    }
    catch(e){console.log(e);}
    return NextResponse.json("Error");
  
}

