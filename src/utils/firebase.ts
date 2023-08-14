import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJqJ-yijshUm5iiLt8zdmbxieCXfCBfLI",
  authDomain: "quantum-saga.firebaseapp.com",
  projectId: "quantum-saga",
  storageBucket: "quantum-saga.appspot.com",
  messagingSenderId: "886543628937",
  appId: "1:886543628937:web:3f37af7274e189c53ee458",
};

const auth = getAuth(initializeApp(firebaseConfig));

export default auth;
