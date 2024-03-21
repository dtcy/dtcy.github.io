export default function Main() {
  return (
    <div className="">
      <div className="chat"></div>
    </div>
  );
}

// import React, { useState, useRef, useEffect } from "react";
// import FirstQuestion from "../constants/FirstQuestion";
// function App() {
//   const [showChat, setShowChat] = useState(false);
//   const [questions, setQuestions] = useState(FirstQuestion);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [chatHistory, setChatHistory] = useState([]);
//   const chatHistoryRef = useRef(null);

//   useEffect(() => {
//     if (chatHistoryRef.current) {
//       chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
//     }
//   }, [chatHistory]);

//   const handleAnswerClick = (nextQuestionId) => {
//     const currentQuestion = questions[currentQuestionIndex];
//     const answerText = currentQuestion.answers.find(
//       (answer) => answer.nextQuestionId === nextQuestionId
//     ).text;

//     // 현재 질문과 선택한 답변을 로컬 스토리지에 저장
//     const chatItem = { question: currentQuestion.text, answer: answerText };
//     const updatedChatHistory = [...chatHistory, chatItem];
//     localStorage.setItem("chatHistory", JSON.stringify(updatedChatHistory));

//     setChatHistory(updatedChatHistory);

//     if (nextQuestionId !== null) {
//       setCurrentQuestionIndex(nextQuestionId - 1);
//     } else {
//       setShowChat(false);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1></h1>
//         {!showChat ? (
//           <button onClick={() => setShowChat(true)}>Start Chat</button>
//         ) : (
//           <div className="chat-container">
//             <div className="chat-history" ref={chatHistoryRef}>
//               {chatHistory.map((chat, index) => (
//                 <div key={index}>
//                   <p>Question: {chat.question}</p>
//                   <p>Answer: {chat.answer}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="current-question">
//               <p>{questions[currentQuestionIndex].text}</p>
//               <div className="answer-options">
//                 {questions[currentQuestionIndex].answers.map((answer) => (
//                   <button
//                     key={answer.id}
//                     onClick={() => handleAnswerClick(answer.nextQuestionId)}
//                   >
//                     {answer.text}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }

// export default App;
