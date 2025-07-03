import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4ZzEgtsUQ-WhGF1OcIzS8UitnICao5Gg",
  authDomain: "vs-code-extension-1574a.firebaseapp.com",
  projectId: "vs-code-extension-1574a",
  storageBucket: "vs-code-extension-1574a.firebasestorage.app",
  messagingSenderId: "435078414757",
  appId: "1:435078414757:web:a831b361eb4a1e6e81684c",
  measurementId: "G-VEV11677Y1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const fireStoreDB = getFirestore(app);
// const analytics = getAnalytics(app);

export { app, storage, fireStoreDB };
