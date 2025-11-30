// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase configuration (from google-services.json)
const firebaseConfig = {
    apiKey: "AIzaSyC4hSBKdGUuGy1MPC_0BDZcYZaOF6gLzw0",
    authDomain: "gaon-connect-f2447.firebaseapp.com",
    projectId: "gaon-connect-f2447",
    storageBucket: "gaon-connect-f2447.firebasestorage.app",
    messagingSenderId: "1045113633347",
    appId: "1:1045113633347:android:ecbfcc5298a5f514e5f2f6",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize core services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// ✅ Export for use throughout your app
export { app, auth, firestore, storage };
