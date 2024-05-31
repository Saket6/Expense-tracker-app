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
        // console.log(user.primaryEmailAddress.emailAddress);
        const BudgetList = await NewBudget.find({createdBy:user?.primaryEmailAddress.emailAddress});
        const BudgetIDs= BudgetList.map(budget => budget._id  );
        const ExpenseList = await  Expense.find({ budgetId: {$in: BudgetIDs}});
        const BudgetsWithExpenses = BudgetList.map(budget => ({
            ...budget,
            expense: ExpenseList.filter(expense => expense.budgetId.toString() === budget._id.toString())
        }))
        // console.log(BudgetsWithExpenses)
        return NextResponse.json({"message":'success', "data": BudgetsWithExpenses});
    }
    catch(e){console.log(e);}
    return NextResponse.json("Error");
  
}

