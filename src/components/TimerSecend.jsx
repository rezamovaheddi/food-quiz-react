import React, { useEffect } from "react";

export default function TimerSecend({ dispatch, secend }) {
  const min = Math.floor(secend / 60);
  const sec = min % 60;
  useEffect(() => {
    const secId = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(secId);
  }, [dispatch]);
  return (
    <div className="timer">
      {min}:{sec}
    </div>
  );
}
