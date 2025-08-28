// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuKrUVS_bHepldclaBoyOkyunhB55o7qk",
  authDomain: "padelcourt-89fa4.firebaseapp.com",
  databaseURL: "https://padelcourt-89fa4-default-rtdb.firebaseio.com",
  projectId: "padelcourt-89fa4",
  storageBucket: "padelcourt-89fa4.firebasestorage.app",
  messagingSenderId: "37054057700",
  appId: "1:37054057700:web:1c32f52dac1dbb728570f1"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// تهيئة قاعدة بيانات Firestore
const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// تصديرها علشان نستخدمها في أي مكان

export { db, auth, provider, signInWithPopup, signOut };