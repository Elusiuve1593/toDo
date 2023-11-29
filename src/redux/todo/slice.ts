import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoList } from "./operations";

const initialState = [] as TodoList[];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchTasks(state, action: PayloadAction<{ todo: TodoList[] }>) {
      return (state = action.payload.todo);
    },
    createTask(state, action: PayloadAction<{ task: TodoList }>) {
      state.unshift(action.payload.task);
    },
    deleteTask(state, action: PayloadAction<{ id: number }>) {
      return state.filter((el) => el.id !== action.payload.id);
    },
    editTask(state, action: PayloadAction<{ task: TodoList }>) {
      return state.map((el) =>
        el.id === action.payload.task.id
          ? { ...el, title: action.payload.task.title }
          : el
      );
    },
    completeTask(state, action: PayloadAction<{ isDone: TodoList }>) {
      return state.map((el) =>
        el.id === action.payload.isDone.id
          ? { ...el, completed: action.payload.isDone.completed }
          : el
      );
    },
  },
});

export const { fetchTasks, createTask, deleteTask, editTask, completeTask } =
  todoSlice.actions;
export default todoSlice.reducer;
