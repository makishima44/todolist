import React, { memo } from "react";
import s from "./Input.module.css";

export type InputProps = {
  placeholder?: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = memo(({ value, onChange, type, placeholder }: InputProps) => {
  return <input className={s.input} type={type} onChange={onChange} value={value} placeholder={placeholder} />;
});
