import todoService from "@services/todo/todo.service";
import { create } from "zustand";
import { createWithEqualityFn } from "zustand/traditional";

export interface ITodo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

interface ITodoState {
  todos: ITodo[];
  isLoading: boolean;
  error: string | null;
  loadTodosList: () => void;
}

const useTodosStore = createWithEqualityFn<ITodoState>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,
  loadTodosList: async () => {
    set({ isLoading: true, error: null });
    try {
      const content = await todoService.getAll();
      set({ todos: content });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "Неизвестная ошибка" });
      }
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useTodosStore;
