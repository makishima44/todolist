import s from "./Button.module.css";

export type ButtonProps = {
  name: string;
  onClick: () => void;
};

export const Button = (props: ButtonProps) => {
  return (
    <button className={s.button} onClick={props.onClick}>
      {props.name}
    </button>
  );
};
