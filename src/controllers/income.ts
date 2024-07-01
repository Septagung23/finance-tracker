import express from "express";

import { 
    getIncome, 
    getIncomeById,
    createIncome,
    deleteIncomeById, 
    updateIncomeById  
} from "../db/income";

export const addIncome = async (req: express.Request, res: express.Response) => {
    try {
        const {name, amount, type, date} = await req.body;
        if(!name || !amount || !type || !date) {
            console.log('Missing required fields');
            return res.sendStatus(400);
        }
        const income = await createIncome({name, amount, type, date})
        return res.status(200).json(income);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllIncome = async (req: express.Request, res: express.Response) => {
    try {
        const income = await getIncome();
        return res.status(200).json(income);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteIncome = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const deletedIncome = await deleteIncomeById(id);
        return res.json(deletedIncome);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
    
export const updateIncome = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const {name, amount, type} = req.body;
        // if(!name || !amount) {
        //     return res.sendStatus(400);
        //     console.log('Missing required fields');
        // }
        const income = await getIncomeById(id);
        income.name = name;
        income.amount = amount;
        income.type = type; 
        await income.save();

        return res.status(200).json(income).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}