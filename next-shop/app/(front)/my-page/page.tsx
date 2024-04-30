"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "@/app/contexts/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Page = () => {
  const { userState, auth } = useAuth();
  const {
    email,
    setEmail,
    password,
    setPassword,
    signIn,
    signOutUser,
    handleSignUp,
    error,
    handleGoogleSignIn,
  } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userState) {
          const userId = userState.uid;
          const cardsCollectionRef = collection(
            getFirestore(),
            "users",
            userId,
            "cards"
          );

          setLoading(true);

          const querySnapshot = await getDocs(cardsCollectionRef);

          const fetchedCards: any[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const card = { id: doc.id, groupName: data.groupName };
            fetchedCards.push(card);
          });
          setCards(fetchedCards);

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchData();
  }, [userState]);

  const handleDeleteCard = async (cardId: any) => {
    try {
      const userId = userState.uid;
      const db = getFirestore();
      const cardRef = doc(db, "users", userId, "cards", cardId);
      await deleteDoc(cardRef);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <>
      <div className="card bg-base-300 shadow-xl mb-4 mt-4 ml-4">
        <div className="card-body">
          {userState ? (
            <>
              <div>Email: {userState.email}</div>
              <p>Status: Authenticated</p>
              <button className="btn btn-secondary" onClick={signOutUser}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{ padding: ".4rem", borderRadius: "5px" }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ padding: ".4rem", borderRadius: "5px" }}
              />
              <button className="btn btn-secondary" onClick={signIn}>
                Sign in
              </button>
              <button className="btn btn-secondary" onClick={handleSignUp}>
                Sign up
              </button>
              {error && <p>Error: {error}</p>}
            </>
          )}
        </div>
      </div>
      <div className="card bg-base-300 shadow-xl mb-4 mt-4 ml-4">
        <div className="card-body">
          <button
            className="btn btn-primary"
            onClick={() => handleGoogleSignIn()}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
