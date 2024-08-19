import React from "react";

export type InputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: InputProps) => {
  return <input type="text" onChange={props.onChange} value={props.value} />;
};
