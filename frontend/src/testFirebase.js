// Test Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "writewave-aa0a5.firebaseapp.com",
  projectId: "writewave-aa0a5",
  storageBucket: "writewave-aa0a5.firebasestorage.app",
  messagingSenderId: "215875343831",
  appId: "1:215875343831:web:c4797a374c4fa45193a792",
  measurementId: "G-3XFHJW80F4"
};

console.log("Testing Firebase Configuration...");
console.log("API Key:", import.meta.env.VITE_FIREBASE_API_KEY ? "✓ Present" : "✗ Missing");
console.log("Auth Domain:", firebaseConfig.authDomain);
console.log("Project ID:", firebaseConfig.projectId);

try {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  console.log("✓ Firebase initialized successfully");
  console.log("✓ Auth instance created");
  
  // Test if we can access auth settings
  console.log("Current user:", auth.currentUser);
  console.log("Auth config:", auth.config);
} catch (error) {
  console.error("✗ Firebase initialization failed:", error);
}

export { firebaseConfig };