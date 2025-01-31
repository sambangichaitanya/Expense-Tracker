import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase.js";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const q = query(collection(db, "expenses"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const expensesData = [];
      querySnapshot.forEach((doc) => {
        expensesData.push({ id: doc.id, ...doc.data() });
      });
      setExpenses(expensesData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.amount} - {expense.category} - {expense.date} -{" "}
            {expense.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
