// FirebaseAuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "./FirebaseConfig";

const FirebaseAuthContext = createContext();

export const useAuth = () => useContext(FirebaseAuthContext);

export const FirebaseAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      console.log("signed in");
      console.log(result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      console.log("signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <FirebaseAuthContext.Provider
      value={{ currentUser, signInWithGoogle, signOutUser }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
