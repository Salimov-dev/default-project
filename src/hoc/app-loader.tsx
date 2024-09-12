import useTodosStore from "@store/use-todos.store";
import { FC, useEffect } from "react";

interface IProps {
  children: React.ReactElement;
}

const AppLoader: FC<IProps> = ({ children }) => {
  const loadTodosList = useTodosStore((state) => state.loadTodosList);
  const todos = useTodosStore((state) => state.todos);
  console.log("todos", todos);

  useEffect(() => {
    loadTodosList();
  }, []);

  return children;
};

export default AppLoader;
