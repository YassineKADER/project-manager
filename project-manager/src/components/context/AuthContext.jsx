import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore/lite";

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

  const uploadPhotoToFirebaseStorage = async (file) => {
    const filename = user["email"];
    const storageRef = ref(storage, "images/" + filename);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const updateUser = async (email, updates) => {
    try {
      const userRef = doc(db, "users", email);
      await updateDoc(userRef, updates);
      console.log("User updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  const getUser = async (email) => {
    try {
      const userRef = doc(db, "users", email);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting user: ", error);
    }
  };

  const emailPasswordSignIn = async (email, password) => {
    let processResult;
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          processResult = true;
        })
        .catch((error) => {
          processResult = false;
        });
    } catch (error) {
      console.log("error found");
    }

    return processResult;
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  };
  const logOut = () => {
    signOut(auth);
  };

  const sendResetEmail = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  const getProjects = async (email) => {
    console.log(email);
    // Query the Project collection for documents that have a leader with the specified email
    const leaderQuery = query(
      collection(db, "projects"),
      where("leader", "array-contains", doc(collection(db, "users"), email))
    );

    // Query the Project collection for documents that have a member with the specified email
    const memberQuery = query(
      collection(db, "projects"),
      where("members", "array-contains", doc(collection(db, "users"), email))
    );
    let Projects = []
    getDocs(leaderQuery).then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        const projectData = doc.data();
        const id = doc.id;
        // Get the leader data by fetching the document referenced by the "leader" field
        const leaderRef = projectData.leader[0];
        const leaderDoc = await getDoc(leaderRef);
        const leaderData = leaderDoc.data();
        if (!Projects.some((obj) => obj.id === id)){
          Projects.push({ projectData, leaderData, id});
        }
      });
      //console.log(Projects);
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });


    getDocs(memberQuery).then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        const projectData = doc.data();
        const id = doc.id;
        // Get the leader data by fetching the document referenced by the "leader" field
        const leaderRef = projectData.leader[0];
        const leaderDoc = await getDoc(leaderRef);
        const leaderData = leaderDoc.data();
        if (!Projects.some((obj) => obj.id === id)){
          Projects.push({ projectData, leaderData, id});
        }
        
      });
      //
      //console.log(Projects)
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });

    return Projects;
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
        updateUser,
        getUser,
        uploadPhotoToFirebaseStorage,
        getProjects,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
