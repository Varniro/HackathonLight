import {db, auth, database, storage } from './firebase_config';
import {getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { doc } from 'firebase/firestore';

const queryString = window.location.search.toString().slice(4); 
window.addEventListener("DOMContentLoaded", (event) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // const queryString = window.location.search;
            // console.log(queryString);
            onValue(sRef(database, `users/${user.uid}/posts/${queryString}`),(snap)=>{
                console.log(`users/${user.uid}/posts/${queryString}`)
                   document.getElementById('location').innerHTML = snap.val().location
                   document.getElementById('time').innerHTML = snap.val().time
                   document.getElementById('desc').innerHTML = snap.val().desc
                   let images = document.getElementsByTagName('img')

                   document.getElementById('tbody').innerHTML = ""

                   for (let i = 0; i < images.length; i++) {
                        images[i].src = snap.val().img
                    }
                    onValue(sRef(database, `users/${user.uid}/posts/${queryString}/registered`),(snapshot)=>{
                        snapshot.forEach((e) => {
                            const tr = document.createElement('tr')
                            const td1 = document.createElement('td')
                            const td2 = document.createElement('td')
                            const td3 = document.createElement('td')
                            td1.innerHTML = e.val().name
                            td2.innerHTML = e.val().location
                            td3.innerHTML = e.val().email
    
                            tr.appendChild(td1)
                            tr.appendChild(td2)
                            tr.appendChild(td3)
                            document.getElementById('tbody').appendChild(tr)
    
                        });
                    })
            })
        } else {
          // User is signed out
          // ...
        }
      });
});

function reg(id, uid){
    
}