import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjWs-MEngBfE_XjF_JxYVkxwWbi0No0ak",
  authDomain: "personal-expense-tracker-3ce56.firebaseapp.com",
  projectId: "personal-expense-tracker-3ce56",
  storageBucket: "personal-expense-tracker-3ce56.firebasestorage.app",
  messagingSenderId: "290662954873",
  appId: "1:290662954873:web:41829534b1d1400d96a1a8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
