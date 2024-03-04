// "use client";
// import { useState, useEffect } from "react";
// export default function App() {
//   const [currTime, setCurrTime] = useState(new Date().toLocaleString());
//   const [countTime, setCountTime] = useState(null);
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const dDay = new Date(2024, 6, 6, 11, 13, 0).getTime();
//       const currTimeNum = new Date().getTime();
//       const timeDiff = dDay - currTimeNum;
//       const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//       const hoursDiff = Math.floor(
//         (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutesDiff = Math.floor(
//         (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
//       );
//       const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

//       const countingTime = `남은 시간: ${daysDiff}일 ${hoursDiff}시간 ${minutesDiff}분 ${secondsDiff}초`;
//       setCurrTime(new Date().toLocaleString());
//       setCountTime(countingTime);
//     }, 1000);
//     console.log("timer on");
//     return () => clearInterval(timer);
//   }, []);
//   return (
//     <div>
//       <div className="wrap">
//         <div className="display">current time{currTime}</div>
//         <div className="countdown">
//           <p>Countdown til 6th Jun 2024: {countTime}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
