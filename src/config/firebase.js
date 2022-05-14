
import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlyZq420i04OirDa6woxAcAn5M3q7YRU8",
  authDomain: "hackathon-69713.firebaseapp.com",
  projectId: "hackathon-69713",
  storageBucket: "hackathon-69713.appspot.com",
  messagingSenderId: "25341738750",
  appId: "1:25341738750:web:83123bfab92f74da1dafaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const storage = getStorage();
const auth = getAuth();
const db = getFirestore();


export {
  auth,
  storage,
  db
}