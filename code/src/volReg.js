import {db, auth, database } from './firebase_config';
import {getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";

document.getElementById('submitbt').addEventListener('click', (e)=>{
    e.preventDefault()

    const uName = document.getElementById('cp_name').value
    const contact = document.getElementById('contact_number').value
    const email = document.getElementById('contact_email').value
    const password = document.getElementById('password').value
    const location = document.getElementById('loc').value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

    //   updateProfile(auth.currentUser, {
    //     Email: email,
    //     Name: uName,
    //     contactNum : contact,
    //     Location : location,
    //     isNgo : false

    //   }).then(() => {
    //     Profile updated!
    //     ...
    //   }).catch((error) => {
    //     An error occurred
    //     ...
    //   });

      set(sRef(database, 'users/' + user.uid), {
        Email: email,
        Name: uName,
        contactNum : contact,
        Location : location,
        isNgo : false
      }).then(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              console.log(user.uid)
              document.location.href = "browse.html"
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
      });

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      console.log(errorCode)
      // ..
    });
})