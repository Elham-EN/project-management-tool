// import dotenv from "dotenv";
// dotenv.config();
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const webAppFirebase = firebase.default;
webAppFirebase.initializeApp(firebaseConfig);

// Initialize services
const firestoreService = webAppFirebase.firestore();
const authService = webAppFirebase.auth();
const storageService = webAppFirebase.storage();

//Firestore timestamp
const timestamp = webAppFirebase.firestore.Timestamp;

export { firestoreService, authService, storageService, timestamp };
