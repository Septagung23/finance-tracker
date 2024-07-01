import express from 'express';

import { 
    deleteIncome,
    getAllIncome,
    updateIncome,
    addIncome
} from '../controllers/income';
import { isAuthenticated } from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/income', isAuthenticated, getAllIncome);
    router.delete('/income/:id', isAuthenticated, deleteIncome);
    router.post('/income', isAuthenticated,  addIncome);
    router.patch('/income/:id', isAuthenticated, updateIncome);
}