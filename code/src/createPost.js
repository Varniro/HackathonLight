import {db, auth, database, storage } from './firebase_config';
import {getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";


document.getElementById('sub').addEventListener('click', (e)=>{
    e.preventDefault();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const postData = {
                author: user.ngoName,
                uid: user.uid,
                desc: document.getElementById('description').value,
                title: document.getElementById('name').value,
                date: document.getElementById('date').value,
                time : document.getElementById('date').value,
                location: document.getElementById('location').value,
              };

             const newPostKey = push(child(sRef(database), 'posts')).key;

             const updates = {};
            updates['/posts/' + newPostKey] = postData;
            updates['/users/' + uid + '/posts/' + newPostKey] = postData;

            update(sRef(database), updates);

            console.log(user.uid)
        } else {
            document.location.href = "login.html"
        }
      });
})

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       document.location.href = "ngodashboard.html"
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
// });