// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a531d.firebaseapp.com",
  projectId: "mern-blog-a531d",
  storageBucket: "mern-blog-a531d.firebasestorage.app",
  messagingSenderId: "748464824958",
  appId: "1:748464824958:web:fde69424e68f1609a16e2f",
  measurementId: "G-DP480ZMTGE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);