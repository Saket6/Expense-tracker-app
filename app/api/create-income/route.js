import { Income } from "@/model/model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const data = await req.json();
  const { name, amount, dateCreated, CategoryId } = data;

  const objectBudgetId = new mongoose.Types.ObjectId(CategoryId);

//   const newdateCreated = dateCreated.toLocaleDateString();
 const newDate = new Date(dateCreated);
  console.log(newDate);
  try {
    const newIncome = new Income({
      name,
      amount,
      dateCreated: newDate,
      CategoryId: CategoryId,
    });
    await newIncome.save();
    console.log(newIncome);
  } catch (e) {
    console.log(e);
    return NextResponse.json("Error");
  }

  return NextResponse.json("Success");
}