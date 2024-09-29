import { ITodo } from "@interfaces/todo.interface";
import todoService from "@services/todo/todo.service";
import { errorMessagesEnum } from "@utils/errors/error-messages.enum";
import { createWithEqualityFn } from "zustand/traditional";

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
        set({ error: errorMessagesEnum.REQUEST_ERROR.UNKNOWN });
      }
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useTodosStore;
