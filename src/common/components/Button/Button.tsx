import s from "./Button.module.css";

export type ButtonProps = {
  name: string;
  onClick: () => void;
  type?: "add" | "delete";
};

export const Button = ({ name, onClick, type = "add" }: ButtonProps) => {
  return (
    <button
      className={`${s.button} ${type === "delete" ? s.delete : s.add}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
