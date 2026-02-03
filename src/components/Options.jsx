import React from "react";

export default function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <ul className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          className={`btn options  btn-option 
          ${index === answer ? "answer" : ""}
          ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          key={option}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </ul>
  );
}
