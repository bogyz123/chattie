// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserObject } from "./Redux/UserSlice";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwpug5qXSWn1L6oJJVhDD7e9VWvzZUaDY",
  authDomain: "chatty-1d97a.firebaseapp.com",
  projectId: "chatty-1d97a",
  storageBucket: "chatty-1d97a.appspot.com",
  messagingSenderId: "44578163149",
  appId: "1:44578163149:web:4e91c53af0c28d04b95c84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Docs by Bogdan
export const database = getFirestore(app); // This is our database reference.
export const auth = getAuth(app);


