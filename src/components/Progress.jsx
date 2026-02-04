import React from "react";

export default function Progress({
  index,
  numQuestion,
  maxPoints,
  points,
  awnswer,
}) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + Number(awnswer !== null)} />
      <p>
        questions <strong>{index + 1}</strong> / {numQuestion}
      </p>
      <p>
        {points}/ <strong>{maxPoints}</strong>
      </p>
    </header>
  );
}
