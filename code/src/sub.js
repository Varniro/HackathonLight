import {database, db } from './firebase_config';
import {getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";

onValue(sRef(database),(snap)=>{
    const p = document.getElementById('test')
    p.innerHTML = snap.val()
})