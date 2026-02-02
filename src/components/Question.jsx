import React from "react";
import Options from "./Options";
export default function Question({ question, dispatch, anwser }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} anwser={anwser} />
    </div>
  );
}
