import { ref, set, remove, onValue, update, getDatabase } from "firebase/database";

import { database } from "./firebaseConfig";
import { Task, Todolist } from "../redux/types/types";

//------------------------------------Tasks-------------------------------------------//

export const fetchTasksFromFirebase = (uid: string, todolistId: string, callback: (tasks: Task[]) => void) => {
  const tasksRef = ref(database, `users/${uid}/tasks/${todolistId}`);
  onValue(tasksRef, (snapshot) => {
    const tasks = snapshot.val();
    callback(tasks ? Object.values(tasks) : []);
  });
};

export const addTaskToFirebase = (uid: string, todolistId: string, task: Task) => {
  const taskRef = ref(database, `users/${uid}/tasks/${todolistId}/${task.id}`);
  return set(taskRef, task);
};

export const deleteTaskFromFirebase = (uid: string, todolistId: string, taskId: string) => {
  const taskRef = ref(database, `users/${uid}/tasks/${todolistId}/${taskId}`);
  return remove(taskRef);
};

export const deleteAllTasksFromFirebase = async (uid: string, todolistId: string) => {
  const db = getDatabase(); // Получаем ссылку на базу данных
  const tasksRef = ref(db, `users/${uid}/tasks/${todolistId}`); // Ссылка на задачи в Firebase
  await remove(tasksRef); // Удаляем данные
};

export const updateTaskTitleInFirebase = async (uid: string, todolistId: string, taskId: string, newTitle: string) => {
  const taskRef = ref(database, `users/${uid}/tasks/${todolistId}/${taskId}`);
  await update(taskRef, { title: newTitle });
};

export const updateTaskStatusInFirebase = async (
  uid: string,
  todolistId: string,
  taskId: string,
  newStatus: string
) => {
  const taskRef = ref(database, `users/${uid}/tasks/${todolistId}/${taskId}`);
  await update(taskRef, { status: newStatus });
};
//------------------------------------Todolist-------------------------------------------//

export const fetchTodolistsFromFirebase = (uid: string, callback: (todolists: Todolist[]) => void) => {
  const todolistsRef = ref(database, `users/${uid}/todolists/`);
  onValue(todolistsRef, (snapshot) => {
    const todolists = snapshot.val() as Record<string, Todolist>; // Приведение типов
    callback(
      todolists
        ? Object.values(todolists).map((td) => ({
            ...td,
            dateCreated: td.dateCreated || new Date().toISOString(), // Обработка dateCreated
          }))
        : []
    );
  });
};

export const addTodolistToFirebase = (uid: string, todolistId: string, title: string) => {
  const todolistRef = ref(database, `users/${uid}/todolists/${todolistId}`);
  const dateCreated = new Date().toISOString();
  return set(todolistRef, { id: todolistId, title, dateCreated });
};

export const removeTodolistFromFirebase = async (uid: string, todolistId: string) => {
  const todolistRef = ref(database, `users/${uid}/todolists/${todolistId}`);
  const tasksRef = ref(database, `users/${uid}/tasks/${todolistId}`);
  await remove(todolistRef);
  await remove(tasksRef);
};

export const updateTodolistTitleInFirebase = (uid: string, todolistId: string, title: string) => {
  const todolistRef = ref(database, `users/${uid}/todolists/${todolistId}`);
  return set(todolistRef, { id: todolistId, title });
};
