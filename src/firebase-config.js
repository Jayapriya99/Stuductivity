// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoODN8avPQy0dX6z3M82R108Wpry6RHSk",
  authDomain: "stuductivity-app.firebaseapp.com",
  projectId: "stuductivity-app",
  storageBucket: "stuductivity-app.appspot.com",
  messagingSenderId: "1000122654096",
  appId: "1:1000122654096:web:f9438d6a3cbcc5da78e715",
  measurementId: "G-XGVHGTMRX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);