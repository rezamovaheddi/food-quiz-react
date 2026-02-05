import React from "react";

export default function NextBtn({ dispatch, numQuestion, index }) {
  if (index < numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "FINISH" })}
      >
        Finish
      </button>
    );
}
