import React, { useEffect, useState } from "react";
import s from "./Clock.module.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
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

export default Clock;
