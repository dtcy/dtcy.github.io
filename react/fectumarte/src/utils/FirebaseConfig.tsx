// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fectumar.firebaseapp.com",
  projectId: "fectumar",
  storageBucket: "fectumar.appspot.com",
  messagingSenderId: "993426991335",
  appId: "1:993426991335:web:07b408d3aa9a2242629a42",
  measurementId: "G-ZGHGZ8G82F",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
