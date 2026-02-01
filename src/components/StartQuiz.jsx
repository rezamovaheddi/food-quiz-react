import React from "react";

export default function StartQuiz({ numQuestion }) {
  return (
    <div>
      <div className="start">
        <h2>wlecome to the food quiz app</h2>
        <h4>{numQuestion} questions</h4>
        <button className="btn">start</button>
      </div>
    </div>
  );
}
