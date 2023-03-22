// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import {
    getFirestore,
} from 'firebase/firestore'

import { getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvcO-7-2-mkXH_h5cwHtyQjoJQUa5SgXQ",
    authDomain: "hackathonlight.firebaseapp.com",
    projectId: "hackathonlight",
    storageBucket: "hackathonlight.appspot.com",
    messagingSenderId: "392094118869",
    appId: "1:392094118869:web:0091546223d33e1546835c",
    databaseURL: "https://hackathonlight-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const database = getDatabase(app);


export {
    auth,
    db,
    database
}