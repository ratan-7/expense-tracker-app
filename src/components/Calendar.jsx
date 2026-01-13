import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function ExpenseCalendar({ selectedDate, setSelectedDate }) {
    return (
        <Calendar
            onChange={(date) =>
                setSelectedDate(date.toISOString().split("T")[0])
            }
        />
    );
}
