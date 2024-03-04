// "use client";
// import React from "react";
// import Square from "./Square";
// import "./main.css";
// import { useState } from "react";
// export default function Page() {
//   const [state, setState] = useState(Array(9).fill(null));

//   function calculateWinner() {
//     const lines = [
//       // 가로
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       // 세로
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       // 대각선
//       [0, 4, 8],
//       [2, 4, 6],
//     ];

//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i];

//       if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//         return board[a]; // 승자의 기호를 반환합니다.
//       }
//     }

//     return null; // 승자가 없는 경우 null을 반환합니다.
//   }
//   return (
//     <div className="wrap">
//       <div className="first-row">
//         {" "}
//         <Square value={state[0]} />
//         <Square />
//         <Square />
//       </div>
//       <div
//         className="second-row
//     "
//       >
//         {" "}
//         <Square />
//         <Square />
//         <Square />
//       </div>
//       <div className="third-row">
//         <Square />
//         <Square />
//         <Square />
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function page() {
  return <div>page</div>;
}
