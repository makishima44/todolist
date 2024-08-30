import React from "react";
import s from "./Input.module.css";

export type InputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ value, onChange }: InputProps) => {
  return (
    <input type="text" className={s.input} onChange={onChange} value={value} />
  );
};
