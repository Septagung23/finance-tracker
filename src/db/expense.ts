import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const ExpenseModel = mongoose.model("Expense", ExpenseSchema);

export const getExpense = () => ExpenseModel.find();
export const getExpenseById = (id: string) => ExpenseModel.findById(id);
export const createExpense = (val: Record<string, any>) =>
  new ExpenseModel(val).save().then((expense) => expense.toObject());
export const deleteExpenseById = (id: string) =>
  ExpenseModel.findByIdAndDelete({ _id: id });
export const updateExpenseById = (id: string, val: Record<string, any>) =>
  ExpenseModel.findByIdAndUpdate(id, val);
