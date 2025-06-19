import React, { useState, useEffect } from "react";
import "./practice.css";

const digitMap = {
  0: [0, 1, 2, 3, 4, 5],
  1: [1, 2],
  2: [0, 1, 6, 4, 3],
  3: [0, 1, 6, 2, 3],
  4: [5, 6, 1, 2],
  5: [0, 5, 6, 2, 3],
  6: [0, 5, 6, 4, 3, 2],
  7: [0, 1, 2],
  8: [0, 1, 2, 3, 4, 5, 6],
  9: [0, 1, 2, 3, 5, 6],
};

const App = () => {
  const [leftOrder, setLeftOrder] = useState([]);
  const [rightOrder, setRightOrder] = useState([]);

  const [input, setInput] = useState(null);
  const [showInput, setShowInput] = useState(null);

  function onAddValue(e) {
    if (e.keyCode === 13 && e.target.value) {
      setInput(Number(e.target.value));
    }
  }

  useEffect(() => {
    if (!input || input < 1 || input > 99) return;
    let current = input;

    const timer = setInterval(() => {
      const left = Math.floor(current / 10);
      const right = current % 10;

      setLeftOrder(current >= 10 ? digitMap[left] : []); // <- Only show left digit if >= 10
      setRightOrder(digitMap[right] || []);
      setShowInput(current);
      console.log(current);
      current--;
      if (current < 1) {
        clearInterval(timer);
        setTimeout(() => {
          setLeftOrder([]);
          setRightOrder([]);
          setShowInput(0);
          setInput(null);
        }, 1000);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [input]);

  return (
    <div className="wrapper">
      <h1 style={{ color: "#ff5c5c", fontSize: "50px" }}>TRAFFIC COUNTDOWN SIMULATION</h1>
      <input
        type="number"
        min={1}
        max={99}
        onKeyDown={onAddValue}
        placeholder="enter number to countdown"
      />
      <div className="gridContainer">
        <div className="seven-segment">
          {[...Array(7)].map((_, ind) => (
            <div
              key={ind}
              className={`segment segment-${ind} ${
                leftOrder.includes(ind) ? "on" : ""
              }`}
            ></div>
          ))}
        </div>
        <div className="seven-segment">
          {[...Array(7)].map((_, ind) => (
            <div
              key={ind}
              className={`segment segment-${ind} ${
                rightOrder.includes(ind) ? "on" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
      <h1 style={{ color: "#ff5c5c", fontSize: "50px" }}>{showInput}</h1>
    </div>
  );
};

export default App;
