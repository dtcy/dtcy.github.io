import React from "react";
import { useProduct } from "@/app/contexts/ProductContext";
function ShowRate({ rate }) {
  return (
    <div>
      <div className="wrapper">
        <div className="stars" style={{ display: "flex" }}>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className={index < rate ? "active" : "inactive"}
                style={{
                  width: "1rem",
                  height: "1rem",
                  border: "1px solid black",
                }}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ShowRate;
