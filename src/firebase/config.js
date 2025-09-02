import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFiZRO-IUkfKcsoYTTuAbVtUGorUvmY2k",
  authDomain: "my-projectw7.firebaseapp.com",
  projectId: "my-projectw7",
  storageBucket: "my-projectw7.firebasestorage.app",
  messagingSenderId: "1076953800226",
  appId: "1:1076953800226:web:1d48db63c4915933e0f47b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app)