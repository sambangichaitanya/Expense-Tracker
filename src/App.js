import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase.js";
import Auth from "./components/Auth";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import SpendingChart from "./components/SpendingChart";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Auth />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              user ? (
                <>
                  <AddExpense />
                  <ExpenseList />
                  <SpendingChart />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
