import connect from "@/db/connect"
import { NextResponse } from "next/server";
import { NewBudget } from "@/model/model";
import { Expense } from "@/model/model";
connect();
export async function POST(req)
{
    try{
        const data=await req.json();
        const user = data.user;
        const BudgetList = await NewBudget.find({createdBy:user?.primaryEmailAddress.emailAddress});
        const BudgetIDs= BudgetList.map(budget => budget._id  );
        const ExpenseList = await  Expense.find({ budgetId: {$in: BudgetIDs}}).sort({_id: -1});
        // console.log(ExpenseList);
        const latestExpense = ExpenseList[0];
        const latestBudget = BudgetList.filter((budget)=>
        {
            return latestExpense.budgetId.toString() == budget._id.toString();
        })[0];

        // let expenses = 0;
        // ExpenseList.forEach(expense => {
        //     if(expense.budgetId.toString()===latestBudget._id.toString())
        //     expenses = expenses + expense.amount;
        // });

        const latestBudgetWithExpense = {
            ...latestBudget , 
            expense:ExpenseList.filter(expense => expense.budgetId.toString() === latestBudget._id.toString())
        }

        console.log(latestBudgetWithExpense);
        return NextResponse.json({"message":'success', "data": latestBudgetWithExpense});
    }
    catch(e){console.log(e);}
    return NextResponse.json("Error");
  
}