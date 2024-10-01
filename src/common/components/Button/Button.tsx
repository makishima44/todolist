import s from "./button.module.css";

export type ButtonProps = {
  name: string;
  onClick: () => void;
  type?: "add" | "delete";
  disabled?: boolean;
};

export const Button = ({
  name,
  onClick,
  type = "add",
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={`${s.button} ${type === "delete" ? s.delete : s.add}`}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};
