import {db, auth, database } from './firebase_config';
import {getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

console.log("ok")


document.getElementById('submitbt').addEventListener('click', (e)=>{
    e.preventDefault()
    console.log("nana")

    const uName = document.getElementById('cp_name').value
    const ngoName = document.getElementById('ngo_name').value
    const contact = document.getElementById('contact_number').value
    const email = document.getElementById('contact_email').value
    const password = document.getElementById('password').value
    const description = document.getElementById('description').value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      set(sRef(database, 'users/' + user.uid), {
        email: email,
        NGO_name: document.getElementById('ngo_name').value,
        Description: document.getElementById('description').value,
        isNgo : true
      });

      user.displayName = document.getElementById('cp_name').value
      user.ngoName = document.getElementById('ngo_name').value
      user.Desc = document.getElementById('description').value
      user.type = "NGO"


    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      console.log(errorCode)
      // ..
    });
})

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log(user.uid)
    document.location.href = "ngodashboard.html"
    // ...
  } else {
    // User is signed out
    // ...
  }
});