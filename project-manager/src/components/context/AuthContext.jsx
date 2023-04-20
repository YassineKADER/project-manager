import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, getDoc, doc, setDoc } from "firebase/firestore/lite";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const checkUsesrExist = async (email) => {
    const userRef = doc(db, "users", email);
    const data = await getDoc(userRef);
    console.log(data.exists());
    return data.exists();
  };
  const addUserData = async (
    email,
    firstName,
    lastName,
    profilePhoto,
    signedWithGoogle
  ) => {
    const usersCollection = collection(db, "users");
    try {
      const docRef = doc(usersCollection, email);
      await setDoc(docRef, {
        firstName,
        lastName,
        profilePhoto,
        signedWithGoogle,
        projects: [],
        displayProjects: true,
      });
      console.log("User added successfully");
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  const emailPasswordSignIn = async (email, password) => {
    let processResult;
    try{
        await signInWithEmailAndPassword(auth, email, password).then((user)=>{processResult = true}).catch((error)=>{processResult = false});
    }catch(error){
        console.log("error found")
    }

    return processResult;
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const logOut = () => {
    signOut(auth);
  };

  const sendResetEmail = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //console.log(currentUser)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        user,
        sendResetEmail,
        checkUsesrExist,
        addUserData,
        emailPasswordSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
