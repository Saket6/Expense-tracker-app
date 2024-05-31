import connect from "@/db/connect"
import { NextResponse } from "next/server";
import { NewBudget } from "@/model/model";
import { Expense } from "@/model/model";
import mongoose from "mongoose";
connect();
export async function POST(req)
{
    try{
        const data=await req.json();
        const user = data.user;
        const id = data.id;
        const objectId = new mongoose.Types.ObjectId(id);
        const Budget = await NewBudget.find({_id: objectId});
        const Expenses = await  Expense.find({ budgetId: objectId});
        // const BudgetsWithExpenses = BudgetList.map(budget => ({
        //     ...budget,
        //     expense: ExpenseList.filter(expense => expense.budgetId.toString() === budget._id.toString())
        // }))
    //    Budget.push(Expenses);
       const BudgetWithExpense=Budget.map(budget => ({
        ...budget,
        expense: Expenses
       }))
        // console.log(BudgetWithExpense)
        // console.log(Expenses)
        return NextResponse.json({"message":'success', "data": BudgetWithExpense});
    }
    catch(e){console.log(e);}
    return NextResponse.json("Error");
  
}

