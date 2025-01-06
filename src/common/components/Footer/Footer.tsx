import { Link } from "react-router-dom";
import s from "./Footer.module.css";
import { Button } from "../Button/Button";

export const Footer = () => {
  return (
    <div className={s.footer}>
      <Link to={"/widgets"}>
        <Button name="Widgets" />
      </Link>
    </div>
  );
};
