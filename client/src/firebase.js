// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "maahiti-73a02.firebaseapp.com",
  projectId: "maahiti-73a02",
  storageBucket: "maahiti-73a02.appspot.com",
  messagingSenderId: "1060301147294",
  appId: "1:1060301147294:web:a5b520502f796fdb3a3f8f",
  measurementId: "G-169QH170C4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);