import React, { useState } from "react";

function Modal({ content }) {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-8 rounded-lg">
          <h2>Modal Content</h2>
          {content}
          <button onClick={() => openModal()}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
