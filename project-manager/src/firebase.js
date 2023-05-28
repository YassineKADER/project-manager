// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite"
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUhNIjZ2Dxp4_dcsrojgsFCE1szkcsejw",
  authDomain: "project-manager-1ab7d.firebaseapp.com",
  projectId: "project-manager-1ab7d",
  storageBucket: "project-manager-1ab7d.appspot.com",
  messagingSenderId: "803615648676",
  appId: "1:803615648676:web:b446e8317c7f809fa06f31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);