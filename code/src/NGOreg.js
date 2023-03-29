import {db, auth, database } from './firebase_config';
import {getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

console.log("ok")


document.getElementById('submitbt').addEventListener('click', (e)=>{
    e.preventDefault()
    e.target.disabled = true
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
      }).then(()=>{
        window.location.href = 'ngodashboard.html'
      })


    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      console.log(errorCode)
      // ..
    });
})