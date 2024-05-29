import React, { useState, useEffect, FC } from "react";

interface CountDownTimerProps {
  mins: number;
}

export const CountdownTimerL: FC<CountDownTimerProps> = ({ mins }) => {
  const [time, setTime] = useState<number>(mins * 60); // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return <p className="animate-pulse">Time left - {formatTime(time)}</p>;
};
