"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "@/app/(front)/my-page/FirebaseAppConfig";

function CardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log("test");
    const fetchCards = async () => {
      try {
        const user = auth.currentUser;
        console.log(user);
        if (user) {
          const userId = user.uid;

          // Firestore의 cards 컬렉션에서 카드 목록 가져오기
          const cardsCollectionRef = collection("users", userId, "cards");
          const querySnapshot = await getDocs(cardsCollectionRef);

          // 가져온 카드 목록을 배열로 변환하여 state에 설정
          const fetchedCards = [];
          querySnapshot.forEach((doc) => {
            fetchedCards.push({ id: doc.id, ...doc.data() });
          });

          setCards(fetchedCards); // fetchedCards 정의가 필요합니다.
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div>
      <h1>Card List</h1>
    </div>
  );
}

export default CardList;
