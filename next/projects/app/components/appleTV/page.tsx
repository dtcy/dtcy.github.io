"use client";
import Nav from "./Nav";
import "./style.css";
import Main from "./Main";
import ContextProvider from "./Auth.provider";

export default function P() {
  return (
    <ContextProvider>
      <div>
        <div className="wrap">
          <Nav />
          <Main />
        </div>
      </div>
    </ContextProvider>
  );
}
