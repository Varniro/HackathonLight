import {db, auth, database, storage } from './firebase_config';
import {getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { doc } from 'firebase/firestore';

window.addEventListener("DOMContentLoaded", (event) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            onValue(sRef(database, `users/${user.uid}/posts`),(snap)=>{
                // document.getElementById('lists').innerHTML = ""
                var count = 0
                snap.forEach((post)=>{
                    let card = document.getElementById('card').cloneNode(true)
                    card.children[0].setAttribute('src', `${post.val().img}`)
                    card.children[1].innerHTML = post.val().title;
                    // card.children[2].innerHTML = post.val().desc;
                    card.children[2].innerHTML = post.val().location + " | " + post.val().date + " @ " + post.val().time
                    const id = Object.keys(snap.val())[count]
                    // card.children[1].children[4].addEventListener('click', reg(Object.keys(snap.val())[count], post.val().uid))
                    card.children[3].addEventListener('click', (e) =>{
                        e.preventDefault()
                        window.location.href = 'managepost.html?id=' + id
                    })

                    console.log(Object.keys(snap.val())[count])
                    document.getElementById('lists').appendChild(card)
                    count++
                })
        
                document.getElementById('lists').children[2].remove()
            })
        } else {
          // User is signed out
          // ...
        }
      });
});

function reg(id, uid){
    
}