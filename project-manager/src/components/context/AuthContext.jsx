import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup,signOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase";

const AuthContext = createContext()

export const AuthContextProvider = ({children})=> {
    const [user, setUser] = useState(null)
    const googleSignIn = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }
    const logOut = ()=>{
        signOut(auth);
    }

    const sendResetEmail = (email)=>{
        sendPasswordResetEmail(auth,email);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            //console.log(currentUser)
        });

        return ()=>{
            unsubscribe();
        }
    },[])

    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user, sendResetEmail}}>
        {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = ()=>{
    return useContext(AuthContext)
}