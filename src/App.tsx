import s from "./App.module.css";
import { Todolist } from "./common/components/Todolist/Todolist";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Header } from "./common/components/Header/Header";


function App() {
  const todolists = useSelector((state: RootState) => state.todolists);

  return (
    <div className={s.App}>
      <Header />
  
      <div className={s.todolistBlock}>
        {todolists.map((td) => {
          return <Todolist todolistName={td.title} todolistId={td.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
