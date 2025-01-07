import { EditableTitle } from "../EditableTitle/EditableTitle";
import { useAppDispatch } from "../../../redux/store";
import { Button } from "../Button/Button";
import {
  fetchTodolistsAsync,
  removeTodolistAsync,
  updateTodolistTitleAsync,
} from "../../../redux/slices/todolist/todolistThunk";

type TodolistTitleBlock = { uid: string; todolistName: string; todolistId: string };

export const TodolistTitleBlock = ({ todolistId, uid, todolistName }: TodolistTitleBlock) => {
  const dispatch = useAppDispatch();

  const handleChangeTodolisTitle = (newTitle: string) => {
    if (uid) {
      dispatch(updateTodolistTitleAsync({ todolistId, title: newTitle, uid }));
    }
  };

  const handleDeleteTodolist = () => {
    if (uid) {
      dispatch(removeTodolistAsync({ todolistId, uid }));
      dispatch(fetchTodolistsAsync(uid));
    }
  };

  return (
    <>
      <EditableTitle title={todolistName} onChange={handleChangeTodolisTitle}></EditableTitle>
      <Button useIcon={true} onClick={handleDeleteTodolist} variant="delete" />
    </>
  );
};
