import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

export const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        list: [],
    },
    reducers: {
        addExpenses: (state, action) => {
            state.list.push(action.payload);
        },
        editExpenses: (state, action) => {
            const { id, amount, category } = action.payload;
            const expense = state.list.find(item => item.id === id);
            if (expense) {
                expense.amount = amount;
                expense.category = category;
            }
        },
        removeExpenses: (state, action) => {
            state.list = state.list.filter(item => item.id !== action.payload)
        },
        setExpenses: (state, action) => {
            state.list = action.payload;
        },
    },
})

export const { addExpenses, editExpenses, removeExpenses, setExpenses } = expenseSlice.actions;

export default expenseSlice.reducer