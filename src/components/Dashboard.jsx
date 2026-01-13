import { useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

const Dashboard = () => {
    const expenses = useSelector(
        state => state.expenses?.list || []
    );

    const [selectedDate, setSelectedDate] = useState(new Date());

    const formattedDate =
        selectedDate.toISOString().split("T")[0];

    const dayExpenses = expenses.filter(
        item => item.date === formattedDate
    );

    const total = dayExpenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );
    console.log("Selected:", formattedDate);


    return (
        <div className="dashboard">
            {/* CALENDAR */}
            <div className="calendar-card">
                <h3>Calendar</h3>
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileClassName="calendar-tile"
                />
            </div>

            {/* EXPENSES */}
            <div className="expense-card">
                <h3>Expenses on {formattedDate}</h3>

                {dayExpenses.length === 0 ? (
                    <p>No expenses for this day</p>
                ) : (
                    <>
                        {dayExpenses.map(item => (
                            <div key={item.id} className="expense-item">
                                <span>₹{item.amount}</span>
                                <span>{item.category}</span>
                            </div>
                        ))}
                        <h4 className="total">Total: ₹{total}</h4>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
