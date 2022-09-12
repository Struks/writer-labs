// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGxuyLZ0yUzj-n5iOcGtuYc68FlGnQutQ",
  authDomain: "writer-labs.firebaseapp.com",
  projectId: "writer-labs",
  storageBucket: "writer-labs.appspot.com",
  messagingSenderId: "605322788215",
  appId: "1:605322788215:web:f8fa4ee522d564b057f572",
  measurementId: "G-JTLF1G0R6D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Analytics
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);


