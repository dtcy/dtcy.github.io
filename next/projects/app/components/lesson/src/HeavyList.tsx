"use client";
function HeavyList() {
  return (
    <ol>
      {Array(5000)
        .fill(null)
        .map((el, index) => (
          <li key={index}>hi</li>
        ))}
    </ol>
  );
}

export default HeavyList;
