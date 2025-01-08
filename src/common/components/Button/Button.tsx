import s from "./button.module.css";
import deleteIcon from "../../assets/img/icons8-delete-trash-24.png";
import addIcon from "../../assets/img/icons8-add-24.png";
import { memo } from "react";

export type ButtonProps = {
  name?: string;
  onClick?: () => void;
  variant?: "add" | "delete";
  disabled?: boolean;
  useIcon?: boolean;
  type?: "button" | "submit" | "reset";
};

export const Button = memo(({ name, type = "button", disabled, onClick, variant = "add", useIcon }: ButtonProps) => {
  const icon = variant === "delete" ? deleteIcon : addIcon;

  return (
    <button
      className={`${s.button} ${variant === "delete" ? s.delete : s.add}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {useIcon && icon && <img src={icon} alt={variant} />}
      {!useIcon && name && <span>{name}</span>}
    </button>
  );
});
