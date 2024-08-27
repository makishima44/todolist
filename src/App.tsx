import { useState } from "react";
import s from "./App.module.css";
import { Input } from "./common/components/Input/Input";
import { Button } from "./common/components/Button/Button";
import { v1 } from "uuid";
import { Todolist } from "./common/components/Todolist/Todolist";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { addTodolist } from "./redux/todolistsSlice";

export type Todolist = {
  id: string;
  name: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  name: string;
};

function App() {
  const dispatch = useDispatch();
  const todolists = useSelector((state: RootState) => state.todolists);

  const [todolistName, setTodolistName] = useState("");

  const createTodolist = () => {
    dispatch(addTodolist({ name: todolistName }));
    setTodolistName("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodolistName(event.target.value);
  };

  return (
    <div className={s.App}>
      <div>
        <Input onChange={handleInputChange} value={todolistName} />
        <Button name={"create Todolist"} onClick={createTodolist} />
      </div>
      <div className={s.todolistBlock}>
        {todolists.map((td) => {
          return <Todolist name={td.name} todolistId={td.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
