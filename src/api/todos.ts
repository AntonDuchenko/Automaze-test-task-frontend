import { Todo } from "@/types/Todo";
import axios from "axios";

export async function getTodos() {
  try {
    const response = await axios.get<Todo[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/todos`
    );

    return response.data;
  } catch (error) {
    throw new Error("Unable to load todos");
  }
}

export async function createTodo(params: Omit<Todo, "id" | "completed">) {
  try {
    const response = await axios.post<Todo>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/todos`,
      params
    );

    return response.data;
  } catch (error) {
    throw new Error("Unable to create todo");
  }
}

export async function deleteTodo(id: number) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/todos/${id}`
    );

    return response.data;
  } catch (error) {
    throw new Error("Unable to delete todo");
  }
}

export async function updateTodo(id: number, completed: boolean) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/todos/${id}`,
      { completed }
    );

    return response.data;
  } catch (error) {
    throw new Error("Unable to update task");
  }
}
