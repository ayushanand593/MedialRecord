import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import {
 addDoc,
 collection,
 getDocs,
 query,
 where,
 doc,
 getDoc,
} from "firebase/firestore";
import { signInWithPhoneNumber } from "firebase/auth";
// Initialize Firebase app

const firebaseConfig = {
    apiKey: "AIzaSyCs25sQ6lWrDdNq9jcFTgI5QtQA_lC9SS8",
    authDomain: "sdp-is18.firebaseapp.com",
    databaseURL: "https://sdp-is18-default-rtdb.firebaseio.com",
    projectId: "sdp-is18",
    storageBucket: "sdp-is18.appspot.com",
    messagingSenderId: "544525623568",
    appId: "1:544525623568:web:7598fee45e55d85360c595"
  };

// Create Firebase Context
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);


// Provider component to wrap your app with Firebase context
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const signInUserWithPhoneNumber = (formatPh, appVerifier) =>
    signInWithPhoneNumber(auth, formatPh, appVerifier);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
    setUser(user);
    // console.log(`user.uid= ${user.uid}`);
    } else {
    setUser(null);
    }
    });
    }, []);
    const isLoggedIn = user !== null ? true : false;
    const LogOut = () => signOut(auth);
  return <FirebaseContext.Provider value={{LogOut,isLoggedIn,signInUserWithPhoneNumber,auth}}>{children}</FirebaseContext.Provider>;
};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
