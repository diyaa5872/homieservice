// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO9LjdMKDVMnZvdIJxQ87lrQesNOTinrA",
  authDomain: "homeservice-de69e.firebaseapp.com",
  projectId: "homeservice-de69e",
  storageBucket: "homeservice-de69e.appspot.com",
  messagingSenderId: "658066217871",
  appId: "1:658066217871:web:dda9fddc6188e0fbb109fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db=getFirestore(app)
