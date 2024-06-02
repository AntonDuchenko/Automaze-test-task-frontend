import { Statuses } from "@/types/Statuses";
import { Todo } from "@/types/Todo";

export const filteredTodos = (
  todos: Todo[],
  status: string,
  query: string,
  sort: string,
  order: string
) => {
  let filteredTodos = todos.filter((todo) => {
    switch (status) {
      case Statuses.Active:
        return !todo.completed;

      case Statuses.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  if (query) {
    filteredTodos = filteredTodos.filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (sort) {
    filteredTodos.sort((todo1, todo2) => todo1.priority - todo2.priority);
  }

  if (order) {
    filteredTodos.reverse();
  }

  return filteredTodos;
};
