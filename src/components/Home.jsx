import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setExpenses,
    addExpenses,
    editExpenses,
    removeExpenses
} from '../redux/expensesSlice'

const Home = () => {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [editId, setEditId] = useState(null);

    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expenses.list)
    const today = new Date().toISOString().split("T")[0];
    /* Load from localStorage */
    useEffect(() => {
        const saved = localStorage.getItem("expenses")
        if (saved) {
            dispatch(setExpenses(JSON.parse(saved)))
        }
    }, [dispatch])

    /* Save to localStorage */
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }, [expenses])

    const handleSubmit = () => {
        if (!amount || !category) return

        if (editId) {
            dispatch(editExpenses({ id: editId, amount, category }))
            setEditId(null)
        } else {
            dispatch(addExpenses({ id: Date.now(), amount, category, date: today }))
        }

        setAmount('')
        setCategory('')
    }

    const handleEdit = (item) => {
        setAmount(item.amount)
        setCategory(item.category)
        setEditId(item.id)
    }

    const totalExpenses = expenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    )

    const formattedDate = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })


    return (
        <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-4 sm:p-6 shadow-md">

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Today’s <span className="text-red-500">Expenses</span>
                    </h2>
                    <p className="text-sm text-gray-500">{formattedDate}</p>
                </div>

                {/* Input Section */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end">

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2
                       text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">Select category</option>
                        <option value="Food">Food</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Travel">Travel</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2
                       text-sm text-gray-800 placeholder-gray-400
                       focus:border-blue-500 focus:outline-none"
                    />

                    <button
                        onClick={handleSubmit}
                        className={`w-full sm:w-auto rounded-md px-5 py-2 text-sm font-semibold text-white transition
              ${editId
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {editId ? "Update" : "Add"}
                    </button>
                </div>

                {/* Expenses List */}
                <ul className="space-y-3">
                    {expenses.map(item => (
                        <li
                            key={item.id}
                            className="flex flex-col gap-3 rounded-lg border border-gray-200
                         bg-gray-50 px-4 py-3
                         sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <p className="text-lg font-semibold text-gray-800">
                                    ₹{item.amount}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {item.category}
                                </p>
                            </div>

                            <div className="flex gap-2 self-end sm:self-auto">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="rounded-md bg-blue-500 px-3 py-1.5
                             text-xs font-medium text-white hover:bg-blue-600"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => dispatch(removeExpenses(item.id))}
                                    className="rounded-md bg-red-500 px-3 py-1.5
                             text-xs font-medium text-white hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Total */}
                <div className="mt-6 rounded-lg bg-red-50 p-4 text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-red-600">
                        Total Expense: ₹{totalExpenses}
                    </h3>
                </div>

            </div>
        </div>
    )
}

export default Home
