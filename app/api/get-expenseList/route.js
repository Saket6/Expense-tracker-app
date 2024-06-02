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
        const BudgetList = await NewBudget.find({createdBy:user.primaryEmailAddress.emailAddress});
        const BudgetIDs= BudgetList.map(budget => budget._id  );

        const ExpenseList = await  Expense.find({ budgetId: {$in: BudgetIDs}}).sort({_id:-1});
        const ExpenseWithBudgetName = ExpenseList.map((expense) => {
            const matchingBudget = BudgetList.find(budget => budget._id.toString() === expense.budgetId.toString());
            return {
              ...expense,
              _doc: matchingBudget
                ? { ...expense._doc, budget: matchingBudget.name }
                : { ...expense._doc, budget: null }, 
            };
          });

          let Expenses=[];
          ExpenseWithBudgetName.forEach(expense=> Expenses.push(expense._doc));
        return NextResponse.json({"message":'success', "data": Expenses});
    }
    catch(e){console.log(e);}
    return NextResponse.json("Error");
  
}

