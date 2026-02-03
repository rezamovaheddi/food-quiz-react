import React from "react";

export default function Progress({ index, numQuestion }) {
  return (
    <header className="progress">
      <p>
        questions {index + 1} / {numQuestion}
      </p>
    </header>
  );
}
