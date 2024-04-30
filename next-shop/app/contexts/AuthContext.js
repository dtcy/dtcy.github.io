"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBYa3C89ST4_TsNk8wLZa-AYKfFu3OghAM",
  authDomain: "ecommerce-11903.firebaseapp.com",
  projectId: "ecommerce-11903",
  storageBucket: "ecommerce-11903.appspot.com",
  messagingSenderId: "901379519957",
  appId: "1:901379519957:web:f82ac5b483a9113184395c",
  measurementId: "G-KH1B76P1MX",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthStateProvider = ({ children }) => {
  const [userState, setUserState] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [emailUser, setEmailUser] = useState(null);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);

      setUser(auth);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  useEffect(() => {
    // 사용자의 인증 상태 변화를 감지하는 리스너 등록
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 인증되었을 때
        setUserState(user);
      } else {
        // 사용자가 로그아웃했을 때
        setUserState(null);
      }
    });

    // 컴포넌트가 언마운트될 때 리스너 해제
    return () => unsubscribe();
  }, [auth]);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      console.log(auth);
      console.log(email);
      setEmailUser(email);
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      // 새로운 사용자의 정보를 users 컬렉션에 추가
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { email: user.email });

      // 해당 사용자의 카트 서브컬렉션 생성
      const cartCollectionRef = collection(userDocRef, "cart");
      await addDoc(cartCollectionRef, { placeholder: true });

      console.log("Email SignUp Success:", user);
    } catch (error) {
      console.error("Email SignUp Error:", error);
      setError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userState,
        signIn,
        signOutUser,
        handleSignUp,
        email,
        setEmail,
        password,
        setPassword,
        error,
        auth,
        handleGoogleSignIn,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
