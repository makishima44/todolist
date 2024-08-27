import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import s from "./Todolist.module.css";

type TodolistProps = {
  name: string;
  todolistId: string;
};

export const Todolist = ({
  name,
  todolistId,
}: 
TodolistProps) => {
  return (
    <div className={s.todolist}>
      <h3 className={s.todolistTitle}>{name}</h3>
      <div className={s.taskBlock}>
        {/* <Input value={taskName} onChange={onTaskChange} /> */}
        {/* <Button name={"create Task"} onClick={addTask} /> */}
      </div>
    </div>
  );
};
