"use client";
import React, { useState } from "react";
import { addDoc, collection, getFirestore, getDocs } from "firebase/firestore";
import { auth } from "@/app/(front)/my-page/FirebaseAppConfig";
import GoogleMap from "@/app/components/google-map/GoogleMap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation"; // next/router 추가

function Page() {
  const router = useRouter(); // useRouter 훅 사용

  const [cardId, setCardId] = useState(null); // 제출된 카드의 ID를 상태로 관리합니다.

  const [visitorName, setVisitorName] = useState("");
  const [visitorsMessage, setVisitorsMessage] = useState("");
  const [visitorsVideo, setVisitorsVideo] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [visitorModalOpen, setVisitorModalOpen] = useState(false);
  const [previewVisitorName, setPreviewVisitorName] = useState("");
  const [previewVisitorsMessage, setPreviewVisitorsMessage] = useState("");
  const [previewVideoURL, setPreviewVideoURL] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [meetupTime, setMeetupTime] = useState("");
  const [meetupPlace, setMeetupPlace] = useState("");
  const [modalMapOpen, setModalMapOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleMeetupPlaceChange = (place) => {
    setMeetupPlace(place);
  };
  const handleVisitorNameChange = (e) => {
    setVisitorName(e.target.value);
  };

  const handleVisitorsMessageChange = (e) => {
    setVisitorsMessage(e.target.value);
  };

  const handleVisitorsVideoChange = (e) => {
    const file = e.target.files[0];
    setVisitorsVideo(file);

    // 비디오 썸네일 프리뷰를 위해 비디오 URL 설정
    const videoObjectURL = URL.createObjectURL(file);
    setVideoURL(videoObjectURL);
  };

  const handleSubmit = async () => {
    // 프리뷰 섹션에 입력한 내용을 표시
    setPreviewVisitorName(visitorName);
    setPreviewVisitorsMessage(visitorsMessage);
    setPreviewVideoURL(videoURL);

    // 모달 닫기
    setVisitorModalOpen(false);
  };

  const handleOutput = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;

        // Firestore 인스턴스 가져오기
        const firestore = getFirestore();

        // 사용자의 cards 컬렉션에 대한 참조
        const cardsCollectionRef = collection(
          firestore,
          "users",
          userId,
          "cards"
        );

        // Firestore에 'cards' 컬렉션이 있는지 확인하고 없으면 생성
        await createCardsCollectionIfNotExist(cardsCollectionRef);
        // Firestore의 'cards' 컬렉션에 데이터 추가
        const docRef = await addDoc(cardsCollectionRef, data);
        // handleOutput 함수 내부에서
        setCardId(docRef.id); // 제출한 카드의 ID를 상태로 설정합니다.

        // 카드에 추가할 데이터
        const data = {
          cardId: cardId,
          groupName,
          meetupTime: selectedDate?.toString() || "", // 선택된 날짜가 없을 경우 빈 문자열로 설정
          meetupPlace,
          visitorName: previewVisitorName,
          visitorsMessage: previewVisitorsMessage,
          visitorsVideo: previewVideoURL,
        };

        // 이후에 링크 생성하는 코드 추가
        const cardLink = `/maker/${docRef.id}`; // 카드의 ID를 사용하여 링크 생성
        router.push(cardLink); // 페이지 이동
      }
    } catch (error) {
      console.error("Error submitting card:", error);
    }
  };

  // 'cards' 컬렉션이 없는 경우 생성
  const createCardsCollectionIfNotExist = async (cardsCollectionRef) => {
    try {
      const docSnap = await getDocs(cardsCollectionRef);
      if (docSnap.empty) {
        // 컬렉션에 문서가 없으면 새로운 문서를 추가하여 컬렉션을 생성합니다.
        await addDoc(collection(cardsCollectionRef), {});
        console.log("Cards collection created successfully!");
      }
    } catch (error) {
      console.error("Error creating cards collection:", error);
    }
  };

  return (
    <div>
      <div className="container flex">
        {/* Preview 섹션 */}
        <section className="w-1/2">
          <div className="preview bg-gray-300 p-4">
            <h2>Preview</h2>
            <div className="group-info">
              {groupName && <p>Group Name: {groupName}</p>}
              {selectedDate && (
                <p>Meetup Time: {selectedDate.toLocaleDateString()}</p>
              )}{" "}
              {meetupPlace && <p>Meetup Place: {meetupPlace}</p>}
            </div>
            <div className="visitor">
              <button onClick={() => setVisitorModalOpen(true)}>
                Write Message
              </button>

              {previewVisitorName && <p>Visitor Name: {previewVisitorName}</p>}
              {previewVisitorsMessage && (
                <p>Visitor Message: {previewVisitorsMessage}</p>
              )}
              {previewVideoURL && (
                <video controls>
                  <source src={previewVideoURL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </section>

        {/* Editor 섹션 */}
        <section className="w-1/2">
          <div className="editor bg-gray-300 p-4">
            <h2>Editor</h2>
            <label htmlFor="">Group Name</label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={handleGroupNameChange}
            />
            <label htmlFor="">Meetup Time</label>
            <DatePicker selected={selectedDate} onChange={handleDateChange} />

            <label htmlFor="">Meetup Place</label>
            <button onClick={() => setModalMapOpen(true)}>
              Select Place on Map
            </button>
            <button style={{ position: "sticky" }} onClick={handleOutput}>
              Save
            </button>
          </div>
        </section>
      </div>

      {/* 모달 */}
      {visitorModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <h2>Modal Content</h2>
            <label htmlFor="visitorName">Visitor Name</label>
            <input
              type="text"
              id="visitorName"
              value={visitorName}
              onChange={handleVisitorNameChange}
            />
            <label htmlFor="visitorsMessage">Visitor Message</label>
            <input
              type="text"
              id="visitorsMessage"
              value={visitorsMessage}
              onChange={handleVisitorsMessageChange}
            />
            <label htmlFor="visitorsVideo">Visitor Video</label>
            <input
              type="file"
              id="visitorsVideo"
              onChange={handleVisitorsVideoChange}
            />
            <button onClick={handleSubmit}>작성완료</button>
            <button onClick={() => setVisitorModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
      {/* 모달 */}
      {modalMapOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <h2>Modal Content</h2>
            <GoogleMap onPlaceSelect={handleMeetupPlaceChange} />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setModalMapOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
