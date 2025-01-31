import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function SpendingChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const q = query(collection(db, "expenses"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const categories = {};
      querySnapshot.forEach((doc) => {
        const expense = doc.data();
        categories[expense.category] =
          (categories[expense.category] || 0) + expense.amount;
      });
      const labels = Object.keys(categories);
      const data = Object.values(categories);
      setChartData({
        labels,
        datasets: [
          {
            label: "Spending",
            data,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      });
    });
    return () => unsubscribe();
  }, []);

  return <Pie data={chartData} />;
}

export default SpendingChart;
