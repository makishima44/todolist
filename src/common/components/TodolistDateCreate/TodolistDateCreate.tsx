import { useMemo } from "react";

import s from "./TodolistDateCreate.module.css";

type TodolistDateCreateProps = {
  dateCreated: string;
};

export const TodolistDateCreate = ({ dateCreated }: TodolistDateCreateProps) => {
  const formattedDate = useMemo(() => new Date(dateCreated).toLocaleString(), [dateCreated]);
  return (
    <div className={s.todolistDateCreateBlock}>
      <span className={s.todolistDateCreate}>Created: {formattedDate}</span>
    </div>
  );
};
