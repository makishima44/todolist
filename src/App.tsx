import { useState } from "react";
import s from "./App.module.css";
import { Input } from "./common/components/Input/Input";
import { Button } from "./common/components/Button/Button";
import { Todolist } from "./common/components/Todolist/Todolist";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { addTodolist } from "./redux/todolistsSlice";

function App() {
  const dispatch = useDispatch();
  const todolists = useSelector((state: RootState) => state.todolists);

  const [todolistName, setTodolistName] = useState("");

  const handleCreateTodolist = () => {
    if (todolistName.length < 4) {
      alert("name should be more 4 symbols");
    } else if (todolistName.length > 25) {
      alert("name should be less than 25 symbols");
    } else {
      dispatch(addTodolist({ title: todolistName }));
      setTodolistName("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodolistName(event.target.value);
  };

  return (
    <div className={s.App}>
      <div>
        <Input onChange={handleInputChange} value={todolistName} />
        <Button name={"create Todolist"} onClick={handleCreateTodolist} />
      </div>
      <div className={s.todolistBlock}>
        {todolists.map((td) => {
          return <Todolist todolistName={td.title} todolistId={td.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
