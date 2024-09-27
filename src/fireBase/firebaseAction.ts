import { ref, set, remove, onValue, update } from "firebase/database";
import { Task } from "../redux/taskSlice";
import { database } from "./firebaseConfig";

//------------------------------------Tasks-------------------------------------------//

export const fetchTasksFromFirebase = (
  todolistId: string,
  callback: (tasks: Task[]) => void
) => {
  const tasksRef = ref(database, `tasks/${todolistId}/`);
  onValue(tasksRef, (snapshot) => {
    const tasks = snapshot.val();
    callback(tasks ? Object.values(tasks) : []);
  });
};

export const addTaskToFirebase = (todolistId: string, task: Task) => {
  const taskRef = ref(database, `tasks/${todolistId}/${task.id}`);
  return set(taskRef, task);
};

export const deleteTaskFromFirebase = (todolistId: string, taskId: string) => {
  const taskRef = ref(database, `tasks/${todolistId}/${taskId}`);
  return remove(taskRef);
};

export const updateTaskTitleInFirebase = async (
  todolistId: string,
  taskId: string,
  newTitle: string
) => {
  const taskRef = ref(database, `tasks/${todolistId}/${taskId}`);
  await update(taskRef, { title: newTitle });
};

export const updateTaskStatusInFirebase = async (
  todolistId: string,
  taskId: string,
  newStatus: string
) => {
  const taskRef = ref(database, `tasks/${todolistId}/${taskId}`);
  await update(taskRef, { status: newStatus });
};
//------------------------------------Todolist-------------------------------------------//

export const fetchTodolistsFromFirebase = (
  callback: (todolists: any) => void
) => {
  const todolistsRef = ref(database, "todolists/");
  onValue(todolistsRef, (snapshot) => {
    const todolists = snapshot.val();
    callback(todolists ? Object.values(todolists) : []);
  });
};

export const addTodolistToFirebase = (todolistId: string, title: string) => {
  const todolistRef = ref(database, "todolists/" + todolistId);
  return set(todolistRef, { id: todolistId, title });
};

export const removeTodolistFromFirebase = async (todolistId: string) => {
  const todolistRef = ref(database, `todolists/${todolistId}`);
  const tasksRef = ref(database, `tasks/${todolistId}`);
  await remove(todolistRef);
  await remove(tasksRef);
};

export const updateTodolistTitleInFirebase = (
  todolistId: string,
  title: string
) => {
  const todolistRef = ref(database, "todolists/" + todolistId);
  return set(todolistRef, { id: todolistId, title });
};
