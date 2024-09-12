import todoService from "@services/todo/todo.service";
import { create } from "zustand";

interface ITodo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

interface ITodoState {
  todos: ITodo[];
  loadTodosList: () => void;
}

const useTodosStore = create<ITodoState>((set, get) => ({
  todos: [],
  loadTodosList: async () => {
    const content = await todoService.getAll();
    set({ todos: content });
  }
}));

export default useTodosStore;
