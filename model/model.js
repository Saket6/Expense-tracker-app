import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    icon:{
        type: String,
        required: true
    },
    createdBy:{
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
}) 

export const NewBudget = mongoose.models.NewBudget || mongoose.model("NewBudget", BudgetSchema);


const ExpenseSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
    budgetId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "NewBudget",
        required: true
    }, 
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})

export const Expense = mongoose.models.Expenses || mongoose.model("Expenses", ExpenseSchema);