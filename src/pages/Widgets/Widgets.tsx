import { Clock } from "../../common/components/Clock/Clock";
import { Weather } from "../../common/components/Weather/Weather";
import s from "./Widgets.module.css";

export const Widgets = () => {
  return (
    <div className={s.widgets}>
      <Weather location={"Mogilev, Belarus"} />
      <Clock />
    </div>
  );
};
