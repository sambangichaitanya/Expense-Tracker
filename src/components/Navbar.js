import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";

function Navbar({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav>
      <h1>Expense Tracker</h1>
      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;
