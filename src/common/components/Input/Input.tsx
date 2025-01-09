import React, { memo } from "react";
import s from "./Input.module.css";

export type InputProps = {
  placeholder?: string;
  type: string;
  value?: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = memo(({ value, onChange, type, placeholder, checked }: InputProps) => {
  return (
    <input
      checked={checked}
      className={s.input}
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
});
