// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "writewave-aa0a5.firebaseapp.com",
  projectId: "writewave-aa0a5",
  storageBucket: "writewave-aa0a5.firebasestorage.app",
  messagingSenderId: "215875343831",
  appId: "1:215875343831:web:c4797a374c4fa45193a792",
  measurementId: "G-3XFHJW80F4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Debug: Log configuration status
console.log("Firebase initialized with project:", firebaseConfig.projectId);
console.log("Auth domain:", firebaseConfig.authDomain);