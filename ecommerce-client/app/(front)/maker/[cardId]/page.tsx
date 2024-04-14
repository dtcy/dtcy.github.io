"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";

import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "@/app/contexts/AuthContext";
interface Card {
  id: string;
  groupName: string;
}
const EditCardPage = ({ params: cardId }) => {
  const [visitorName, setVisitorName] = useState("");
  const [visitorsMessage, setVisitorsMessage] = useState("");
  const [videoURL, setVideoURL] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [meetupTime, setMeetupTime] = useState("");
  const [meetupPlace, setMeetupPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [card, setCard] = useState(null);
  const { userState } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userState) {
          const userId = userState.uid;
          const db = getFirestore();
          const cardsCollectionRef = collection(db, "users", userId, "cards");

          setLoading(true);

          const querySnapshot = await getDocs(cardsCollectionRef);
          const fetchedCards: Card[] = [];
          console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const card: Card = {
              id: doc.id,
              groupName: data.groupName,
              visitorName: data.visitorName,
              visitorsMessage: data.visitorsMessage,
              videoURL: data.videoURL,
              meetupTime: data.meetupTime,
              meetupPlace: data.meetupPlace,
            };
            fetchedCards.push(card);
          });

          const selectedCard = fetchedCards.filter(
            (card) => card.id === cardId.cardId
          );
          setCard(selectedCard[0]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchData();
  }, [userState]);
  return (
    <>
      {" "}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {card && (
            <div>
              <h2>Card ID: {card.id}</h2>
              <p>Group Name: {card.groupName}</p>
              <p>Visitor Name: {card.visitorName}</p>
              <p>Visitor Message: {card.visitorsMessage}</p>
              <video src={card.videoURL} controls />
              <p>Meetup Time: {card.meetupTime}</p>
              <p>Meetup Place: {card.meetupPlace}</p>
              {/* 다른 정보를 출력하는 필요에 따라 추가 */}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EditCardPage;
