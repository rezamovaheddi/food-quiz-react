import React from "react";

export default function NextBtn({ dispatch, answer }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}
