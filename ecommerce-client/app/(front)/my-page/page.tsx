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
import Link from "next/link";

const Page = () => {
  const { userState } = useAuth();
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

  const {
    email,
    setEmail,
    password,
    setPassword,
    signIn,
    signOutUser,
    handleSignUp,
    error,
  } = useAuth();

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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {cards.map((card) => (
            <div key={card.id}>
              <h2>Card ID: {card.id}</h2>
              <p>Group Name: {card.groupName}</p>
              <Link href={`/maker/${card.id}`}>
                <button>Edit</button>
              </Link>{" "}
              <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <div>
        {userState ? (
          <>
            <div>Email: {userState.email}</div>
            <p>Status: Authenticated</p>
            <button onClick={signOutUser}>Sign out</button>
          </>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={signIn}>Sign in</button>
            <button onClick={handleSignUp}>Sign up</button>
            {error && <p>Error: {error}</p>}
          </>
        )}
      </div>
    </>
  );
};

export default Page;
