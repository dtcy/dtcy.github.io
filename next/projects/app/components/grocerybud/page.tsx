"use client";
import "./page.css";
import { useState, useRef } from "react";

export default function Page() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<
    { id: number; item: string; isChecked: boolean }[]
  >([]);

  const clearItem = () => {
    setItems([]);
  };

  const addItem = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      const newItem = {
        id: Date.now(),
        item: inputRef.current.value,
        isChecked: false,
      };

      setItems((prevItems) => [...prevItems, newItem]);

      inputRef.current.value = "";
    }
  };

  const delItem = (index: number) => {
    setItems((prevItems) => {
      const updated = [...prevItems];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  const handleCheck = (index: number) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : { ...item }
      )
    );
  };

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
            <p key={index}>
              <input
                id="input-item"
                className={item.isChecked ? "lineStroke" : ""}
                type="text"
                value={item.item}
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    const updatedItems = [...items];
                    updatedItems[index].item = e.target.value;
                    setItems(updatedItems);
                  }
                }}
              />
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
