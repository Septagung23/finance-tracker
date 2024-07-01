import express from 'express';

import {
    getAllExpense,
    deleteExpense,
    updateExpense,
    addExpense
} from '../controllers/expense';
import { isAuthenticated } from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/expense', isAuthenticated, getAllExpense);
    router.delete('/expense/:id', isAuthenticated, deleteExpense);
    router.post('/expense', isAuthenticated, addExpense);
    router.patch('/expense/:id', isAuthenticated, updateExpense);
}