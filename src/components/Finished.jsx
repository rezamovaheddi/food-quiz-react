import React from "react";

export default function Finished({ points, maxPoints }) {
  const pec = Math.round((points / maxPoints) * 100);
  const cil = Math.ceil(pec);
  return (
    <p className="result">
      Congratulations! Your total points: {points} <strong>{cil} %</strong>
    </p>
  );
}
