import s from "./button.module.css";
import deleteIcon from "../../assets/img/icons8-delete-trash-24.png";
import addIcon from "../../assets/img/icons8-add-24.png";

export type ButtonProps = {
  name?: string;
  onClick: () => void;
  type?: "add" | "delete";
  disabled?: boolean;
  useIcon?: boolean;
};

export const Button = ({
  name,
  onClick,
  type = "add",
  disabled,
  useIcon,
}: ButtonProps) => {
  let icon;

  if (type === "delete") {
    icon = deleteIcon;
  } else if (type === "add") {
    icon = addIcon;
  }
  return (
    <button
      className={`${s.button} ${type === "delete" ? s.delete : s.add}`}
      onClick={onClick}
      disabled={disabled}
    >
      {useIcon && icon && <img src={icon} alt={type} />}
      {!useIcon && name && <span>{name}</span>}
    </button>
  );
};
