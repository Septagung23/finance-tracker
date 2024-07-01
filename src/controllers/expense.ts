import express from "express";

import { 
    getExpense,
    getExpenseById, 
    createExpense,
    deleteExpenseById, 
    updateExpenseById
} from "../db/expense";

export const addExpense = async (req: express.Request, res: express.Response) => { 
    try {
        const {name, amount, type, date} = await req.body;
        if(!name || !amount || !type || !date) {
            console.log('Missing required fields');
            return res.sendStatus(400);
        }
        const expense = await createExpense({name, amount, type, date});
        return res.status(200).json(expense);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllExpense = async (req: express.Request, res: express.Response) => {
    try {
        const expense = await getExpense();
        return res.status(200).json(expense);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteExpense = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const deletedExpense = await deleteExpenseById(id);
        return res.json(deletedExpense);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateExpense = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const {name, amount, type, date} = req.body;
        // if(!name || !amount) {
        //     return res.sendStatus(400);
        //     console.log('Missing required fields');
        // }
        const expense = await getExpenseById(id);
        expense.name = name;
        expense.amount = amount;
        expense.type = type; 
        expense.date = date;
        await expense.save();
        return res.json(expense);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
