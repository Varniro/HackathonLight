import { auth, database, db } from '././firebase_config';
import { getDatabase, ref as sRef, child,push, get, onValue, update, set } from "firebase/database";
import { doc } from '@firebase/firestore';
import { getAuth, signInWithEmailAndPassword ,updateProfile } from "firebase/auth";

document.getElementById('signupbt').addEventListener('click', (e)=>{
    e.preventDefault();

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    signInWithEmailAndPassword  (auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        onValue(sRef(database, `users/${user.uid}`), (snap) =>{
            if(snap.val().isNgo == true){
                window.location.href = "ngodashboard.html"
            }else{
                window.location.href = "browse.html"
            }
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
})