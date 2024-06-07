import connect from "@/db/connect"
import { NextResponse } from "next/server";
import { IncomeCategory } from "@/model/model";
import { Income } from "@/model/model";

connect();
export async function POST(req)
{
    try{
        const data=await req.json();
        const user = data.user;
        // console.log(user.primaryEmailAddress.emailAddress);
        const CategoryList = await IncomeCategory.find({createdBy:user?.primaryEmailAddress.emailAddress});
        const CategoryIDs= CategoryList.map(category => category._id  );
        const IncomeList = await  Income.find({ CategoryId: {$in: CategoryIDs}});
        const CategoriesWithIncomes = CategoryList.map(category => ({
            ...category,
            incomes: IncomeList.filter(income => income.CategoryId.toString() === category._id.toString())
        }))
        // console.log(BudgetsWithExpenses)
        return NextResponse.json({"message":'success', "data": CategoriesWithIncomes});
    }
    catch(e){console.log(e);}
    return NextResponse.json("Error");
  
}

