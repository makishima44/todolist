import { useEffect, useState } from "react";
import s from "./Clock.module.css";

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[time.getDay()];
  const dayOfMonth = time.getDate();
  const month = months[time.getMonth()];

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  const timeString = `${hours}:${minutes}:${seconds}`;
  const dateString = `${dayOfWeek} ${dayOfMonth} ${month}`;
  return (
    <div className={s.clockContainer}>
      <p className={s.dateText}>{dateString}</p>
      <p className={s.timeText}>{timeString}</p>
    </div>
  );
};
