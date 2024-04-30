"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/auth";
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
function Header() {
  const { userState } = useAuth();
  //   console.log(userState.email);
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href="/" className="btn btn-ghost text-lg">
            <p>Fectumarte</p>
          </Link>
          <ul className="flex">
            {/* <li>
              <Link className="btn btn-ghost rounded-btn" href="/cart">
                Cart
              </Link>
            </li> */}

            {/* <li>
              <Link className="btn btn-ghost rounded-btn" href="/my-page">
                My page
              </Link>
            </li> */}
            {userState?.email === "seyoit@gmail.com" ? (
              <li>
                <Link className="btn btn-ghost rounded-btn" href="/admin">
                  Admin
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
