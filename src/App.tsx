import { useState } from "react";
import "./App.css";
import { Input } from "./common/components/Input/Input";
import { Button } from "./common/components/Button/Button";
import { v1 } from "uuid";

type TodolistProps = {
  id: string;
  name: string;
};

function App() {
  const [todolists, setTodolist] = useState<TodolistProps[]>([]);
  const [todolistName, setTodolistName] = useState("");

  const addTodolist = () => {
    const newTodolist = { id: v1(), name: todolistName };
    setTodolist([newTodolist, ...todolists]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodolistName(event.target.value);
  };

  return (
    <div className="App">
      <div>
        <Input onChange={handleInputChange} value={todolistName} />
        <Button name={"create Todolist"} onClick={addTodolist} />
      </div>
      <div>
        {todolists.map((td) => {
          return <li>{td.name}</li>;
        })}
      </div>
    </div>
  );
}

export default App;
