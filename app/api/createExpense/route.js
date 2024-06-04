import { Expense } from "@/model/model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const data = await req.json();
  const { name, amount, dateCreated, budgetId } = data;

  const objectBudgetId = new mongoose.Types.ObjectId(budgetId);

//   const newdateCreated = dateCreated.toLocaleDateString();
 const newDate = new Date(dateCreated);
  console.log(newDate);
  try {
    const newExpense = new Expense({
      name,
      amount,
      dateCreated: newDate,
      budgetId: objectBudgetId,
    });
    await newExpense.save();
    console.log(newExpense);
  } catch (e) {
    console.log(e);
    return NextResponse.json("Error");
  }

  return NextResponse.json("Success");
}