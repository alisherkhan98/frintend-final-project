import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs8heH5YNjj46bQaJEhfiSSSvJXtyLIME",
  authDomain: "impact-61ae0.firebaseapp.com",
  projectId: "impact-61ae0",
  storageBucket: "impact-61ae0.appspot.com",
  messagingSenderId: "659972565036",
  appId: "1:659972565036:web:4219651a300905f9464989",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth();
export const db = getFirestore(app);
