"use client";
import "./page.css";
import { useState, useRef } from "react";
export default function Page() {
  const inputRef = useRef(null);
  const [items, setItems] = useState<string[]>([]);
  const clearItem = () => {
    setItems([]);
  };
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      item: inputRef.current.value,
      isChecked: false,
    };

    setItems((prevItems) => [...prevItems, newItem]);

    inputRef.current.value = "";
  };
  const delItem = (index) => {
    console.log(items);

    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleKeyPress = (event) => {
    // 만약 눌린 키가 Enter 키(키 코드 13)이면
    if (event.key === "Enter") {
      // submitButton 클릭 이벤트 발생
      addItem();
    }
  };
  const handleCheck = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const editItem = () => {};

  return (
    <div>
      <div className="wrap">
        <div className="title"></div>
        <div className="container"></div>
        <div className="input-box">
          <input ref={inputRef} type="text" onKeyPress={handleKeyPress} />
          <button onClick={addItem}>add</button>
          <button onClick={clearItem}>clear</button>
        </div>
        <div className="output-box">
          {items.map((item, index) => (
            <p key={index} className={item.isChecked ? "lineStroke" : ""}>
              {item.item}
              <span>
                <button onClick={() => delItem(index)}>x</button>
              </span>
              <span>
                <button onClick={() => handleCheck(index)}>v</button>
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
