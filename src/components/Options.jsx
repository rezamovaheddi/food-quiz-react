import React from "react";

export default function Options({ question, dispatch }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: "newAnwser", payload: index })}
          className="btn options  btn-option"
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
