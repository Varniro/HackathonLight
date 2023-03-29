import {db, auth, database, storage } from './firebase_config';
import {getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { doc } from 'firebase/firestore';

window.addEventListener("DOMContentLoaded", (event) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid)
          var name, email, loca
          console.log(`users/${uid}`)
          onValue(sRef(database,`users/${uid}`), (snapshot) =>{
              name = snapshot.val().Name
              email = snapshot.val().Email
              loca = snapshot.val().Location
          })
          document.getElementById('logout').addEventListener('click', (e)=>{
              signOut(auth)
              window.location.href = 'login.html'
          })
          onValue(sRef(database, 'posts'),(snap)=>{
              // document.getElementById('lists').innerHTML = ""
              var count = 0
              snap.forEach((post)=>{
                  let card = document.getElementById('cardIN').cloneNode(true)
                  // card.setAttribute("name", Object.keys(snap.val())[count])
                  console.log(Object.keys(snap.val())[count])
                  let key = Object.keys(snap.val())[count]
                  // let card = card.cloneNode(true)
                  // console.log(post.val())
                  card.children[0].setAttribute('src', `${post.val().img}`)
                  card.children[1].children[0].innerHTML = post.val().title;
                  card.children[1].children[1].innerHTML = post.val().desc;
                  card.children[1].children[3].innerHTML = post.val().location + " | " + post.val().date + " @ " + post.val().time
                  // card.children[1].children[4].addEventListener('click', reg(Object.keys(snap.val())[count], post.val().uid))
                  card.children[1].children[4].addEventListener('click', (e) =>{
                      e.preventDefault()
                          console.log(`users/${post.val().uid}/posts/${key}/registered/${user.uid}`)
                          set(sRef(database, `users/${post.val().uid}/posts/${key}/registered/${user.uid}`),{
                              name: name,
                              email: email,
                              location: loca
                          })
                      console.log(user.Name)
                  })
                  document.getElementById('lists').appendChild(card)
                  count++
              })
      
              document.getElementById('lists').children[0].remove()
          })
        } else {
          // User is signed out
          // ...
        }
      })
});

