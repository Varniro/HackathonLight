import {db, auth, database, storage } from './firebase_config';
import {getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

const card = document.getElementById('cardIN').cloneNode(true)

onValue(sRef(database, 'posts'),(snap)=>{
    document.getElementById('lists').innerHTML = ""
    snap.forEach((post)=>{
        console.log(post.val())
        card.children[0].setAttribute('src', `${post.val().img}`)
        card.children[1].children[0].innerHTML = post.val().title;
        card.children[1].children[1].innerHTML = post.val().desc;
        card.children[1].children[3].innerHTML = post.val().location + " | " + post.val().date + " @ " + post.val().time
        document.getElementById('lists').appendChild(card)
    })
})