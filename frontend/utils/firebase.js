// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginskillforge-cb733.firebaseapp.com",
  projectId: "loginskillforge-cb733",
  storageBucket: "loginskillforge-cb733.firebasestorage.app",
  messagingSenderId: "677335937071",
  appId: "1:677335937071:web:91ae4347a8bcbb3fe516da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}