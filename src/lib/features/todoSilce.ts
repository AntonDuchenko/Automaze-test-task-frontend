import { getTodos } from "@/api/todos";
import { Todo } from "@/types/Todo";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  todos: Todo[];
  loading: boolean;
  error: string;
}

const initialState: initialStateType = {
  todos: [],
  loading: true,
  error: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload];
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
  },
});

export default todoSlice.reducer;
export const { createTodo, deleteTodo, toggleTodo } = todoSlice.actions;

export const init = createAsyncThunk(
  "quizes/fetch",
  async () => await getTodos()
);
