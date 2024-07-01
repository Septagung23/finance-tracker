import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true}, 
    type: {type: String, required: true},
    date: {type: Date, required: true},
})

export const IncomeModel = mongoose.model('Income', IncomeSchema);

export const getIncome = () => IncomeModel.find();
export const getIncomeById = (id: string) => IncomeModel.findById(id);
export const createIncome =  (val: Record<string, any>) => new IncomeModel(val).save().then((income) => income.toObject());
export const deleteIncomeById = (id: string) => IncomeModel.findByIdAndDelete( {_id: id});
export const updateIncomeById = (id: string, val: Record<string, any>) => IncomeModel.findByIdAndUpdate(id, val)