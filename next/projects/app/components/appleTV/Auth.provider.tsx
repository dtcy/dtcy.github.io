import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAp3gOKfGjOVy6Ugs7Gc1ZXeIukDOvw3O0",
  authDomain: "test-b4aae.firebaseapp.com",
  projectId: "test-b4aae",
  storageBucket: "test-b4aae.appspot.com",
  messagingSenderId: "1016746771636",
  appId: "1:1016746771636:web:2f46ff691d4690e4cec3e1",
  measurementId: "G-8H50WRXSDC",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

// createContext를 사용하여 Context 생성
export const LoginContext = createContext({
  signState: false,
  userData: null,
  handleSignIn: () => {},
  handleSignOut: () => {},
});

// 커스텀 훅을 사용하여 Context 사용
export const useLogin = () => useContext(LoginContext);

// ContextProvider 컴포넌트 정의
function ContextProvider({ children }) {
  const [signState, setSignState] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        setSignState(true);

        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUserData(null);
        setSignState(false);

        localStorage.removeItem("user");
      }
    });

    // Clean-up function
    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user.photoURL, "signed in!");
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <LoginContext.Provider
      value={{ signState, userData, handleSignIn, handleSignOut }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default ContextProvider;
