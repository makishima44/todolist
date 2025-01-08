export type Todolist = {
  id: string;
  title: string;
  dateCreated?: string;
};

export type TodolistsState = {
  todolists: Todolist[];
  loading: boolean;
  error: string | null;
};

export type StatusTask = "all" | "active" | "complete";

export type Task = {
  id: string;
  title: string;
  status: StatusTask;
};

export type TasksState = {
  tasks: {
    [todolistId: string]: Task[]; // Ключ - id тудулиста, значение - массив задач
  };
  filteredStatus: {
    [todolistId: string]: StatusTask;
  };
};
