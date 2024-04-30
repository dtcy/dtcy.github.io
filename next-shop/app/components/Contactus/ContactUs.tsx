"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/contexts/AuthContext";
function ContactUs() {
  const [email, setEmail] = useState("");
  const [wA, setWA] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleWAChange = (event) => {
    setWA(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Firestore에 데이터 추가
      const docRef = await addDoc(collection(db, "contacts"), {
        email: email,
        whatsapp: wA,
      });
      console.log("Document written with ID: ", docRef.id);

      // 입력 후 이메일 및 WhatsApp 입력란 비우기
      setEmail("");
      setWA("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center m-5">
      <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex items-center mb-2">
          <label htmlFor="" className="text-gray-700 font-semibold mr-2">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex items-center mb-2  mr-10">
          <label htmlFor="" className="text-gray-700 font-semibold mr-2">
            WhatsApp:
          </label>
          <input
            type="wa"
            placeholder="Enter your whatsapp number"
            value={wA}
            onChange={handleWAChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors ml-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
