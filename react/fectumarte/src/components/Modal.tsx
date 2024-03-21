import React, { useState } from "react";

export default function Modal({ closeModal }) {
  const [selectedBusiness, setSelectedBusiness] = useState("");

  const handleRadioChange = (event) => {
    setSelectedBusiness(event.target.value);
  };

  const handleNext = () => {
    if (selectedBusiness) {
      // 객관식 답변을 로컬 스토리지에 저장
      localStorage.setItem("businessType", selectedBusiness);
      // 다음 단계로 이동하는 로직 추가
    } else {
      alert("Please select a business type.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>What's your business?</h2>
        <form>
          <label>
            <input
              type="radio"
              name="businessType"
              value="Retail"
              onChange={handleRadioChange}
            />
            Retail
          </label>
          <label>
            <input
              type="radio"
              name="businessType"
              value="Technology"
              onChange={handleRadioChange}
            />
            Technology
          </label>
          <label>
            <input
              type="radio"
              name="businessType"
              value="Finance"
              onChange={handleRadioChange}
            />
            Finance
          </label>
        </form>
        <button onClick={handleNext}>Next</button>
        <button onClick={closeModal}>Close Modal</button>
      </div>
    </div>
  );
}
