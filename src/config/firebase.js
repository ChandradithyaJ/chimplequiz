import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA6S0rtACM8OcsZBb_Y20BdwnYN_XGPUQs",
    authDomain: "chimple-quiz.firebaseapp.com",
    projectId: "chimple-quiz",
    storageBucket: "chimple-quiz.appspot.com",
    messagingSenderId: "453961026771",
    appId: "1:453961026771:web:5f727c695598412c58d826",
    measurementId: "G-5KSWK9P7F7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)