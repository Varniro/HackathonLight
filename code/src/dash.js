import {db, auth, database } from './firebase_config';
import {getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    
  } else {
        window.location.href = "login.html"
  }
});

document.getElementById('logout').addEventListener('click', (e) =>{
    signOut(auth)
    .then(() => {
        console.log("Sign Out Successful");
        window.location = 'login.html';
    }).catch((err) => {
        console.log(err.message);
    })
})

// document.getElementById('')