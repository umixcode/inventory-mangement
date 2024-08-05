
// This is the firebase config file for the inventory management app
// It is a database that stores the inventory data

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdjwY_pRAbhfynt-Cl9d1oT2oSXRN1SGY",
  authDomain: "inventory-management-b1ef4.firebaseapp.com",
  projectId: "inventory-management-b1ef4",
  storageBucket: "inventory-management-b1ef4.appspot.com",
  messagingSenderId: "504916278637",
  appId: "1:504916278637:web:3a6c16828052b417ba2e64",
  measurementId: "G-VKCVJ9CZF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // This is the firestore database

export { firestore }; // This is the firestore database

// The database contains collections, in which each collection is a database
// Each database can contain indiviudal items 