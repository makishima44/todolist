import s from "./App.module.css";
import { Todolist } from "./common/components/Todolist/Todolist";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./redux/store";
import { Header } from "./common/components/Header/Header";
import { useEffect } from "react";
import { fetchTodolistsAsync } from "./redux/todolistThunk";

function App() {
  const dispatch = useAppDispatch();
  const todolists = useSelector(
    (state: RootState) => state.todolists.todolists
  );

  useEffect(() => {
    dispatch(fetchTodolistsAsync());
  }, [dispatch]);

  return (
    <div className={s.App}>
      <Header />

      <div className={s.todolistBlock}>
        {todolists.map((td) => (
          <Todolist
            todolistName={td.title}
            todolistId={td.id}
            dateCreated={td.dateCreated || "Unknown Date"}
            key={td.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
