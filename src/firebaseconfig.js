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
  appId: "1:544525623568:web:7598fee45e55d85360c595",
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
  const [userDocRef, setUserDocRef] = useState(null);
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

  const handleUserDocRef = (docRef) => setUserDocRef(docRef);
  // useEffect((docRef) => setUserDocRef(docRef), [userDocRef]);

  useEffect(() => {
    const savedUserDocRef = sessionStorage.getItem("userDocRef");
    if (savedUserDocRef) {
      setUserDocRef(JSON.parse(savedUserDocRef));
    }
  }, []);
  useEffect(() => {
    sessionStorage.setItem("userDocRef", JSON.stringify(userDocRef));
  }, [userDocRef]);

  const handleUser = async (userData) => {
    const collectionRef = collection(database, "users");
    const q = query(
      collectionRef,
      where("phoneNumber", "==", userData.phoneNumber)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      try {
        const docRef = await addDoc(collectionRef, {
          userID: userData.uid,
          phoneNumber: userData.phoneNumber,
        }).then(handleUserDocRef(docRef.id));
      } catch (error) {}
    } else {
      const docSnapShot = querySnapshot.docs[0];

      handleUserDocRef(docSnapShot.id);
    }
  };

  const formatOrderTime = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const formSubmit = async (
    age,
    allergies,
    bloodType,
    diagnosis,
    gender,
    name,
    treatment
  ) => {
    const collectionRef = collection(
      database,
      "users",
      userDocRef,
      "medicalRecord"
    );
    console.log("userDocRef", userDocRef);
    const resultObject = await addDoc(collectionRef, {
      // patientDetails: selectedFood,
      name,
      age,
      gender,
      bloodtype:bloodType,
      allergies,
      diagnosis,
      treatment,
      userID: user.uid,
      phoneNumber: user.phoneNumber,
      Time: formatOrderTime(Date.now()),
    });
    // console.log("auth.currentUser.uid=", auth.currentUser.uid);
    //console.log("resultObject of placeOrder", resultObject);
    return resultObject;
  };

  const removeUserDocRef=()=>{
    return setUserDocRef(null);
  }

  const isLoggedIn = user !== null ? true : false;
  const LogOut = () => signOut(auth);
  return (
    <FirebaseContext.Provider
      value={{
        LogOut,
        isLoggedIn,
        signInUserWithPhoneNumber,
        auth,
        handleUser,
        formSubmit,
        removeUserDocRef
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
