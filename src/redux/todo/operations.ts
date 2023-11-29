import axios, { AxiosError } from "axios";
import { instance } from "./../axiosConfig";
import { toast } from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  completeTask,
  createTask,
  deleteTask,
  editTask,
  fetchTasks,
} from "./slice";
import { setLoading } from "../preloader/slice";

export interface TodoList {
  userId?: number;
  id: number;
  title?: string;
  completed?: boolean;
}
//!Toaster!!!
export const fetchTasksThunk = createAsyncThunk(
  "todo/fetchTodoList",
  async (_, { dispatch }) => {
    dispatch(setLoading({ isLoading: true }));
    try {
      const res = await instance.get<TodoList[]>("todos");
      dispatch(fetchTasks({ todo: res.data }));
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      dispatch(setLoading({ isLoading: false }));
    }
  }
);

export const addTaskThunk = createAsyncThunk(
  "todo/addTodoList",
  async (value: TodoList, { dispatch }) => {
    console.log(value);
    dispatch(setLoading({ isLoading: true }));
    try {
      const res = await instance.post<TodoList>("todos", value);

      const taskWithCustomId: TodoList = {
        ...res.data,
        id: Date.now(),
      };

      dispatch(createTask({ task: taskWithCustomId }));
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      dispatch(setLoading({ isLoading: false }));
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "todo/deleteTodoList",
  async (id: number, { dispatch }) => {
    dispatch(setLoading({ isLoading: true }));
    try {
      await instance.delete<TodoList>(`todos/${id}`);
      dispatch(deleteTask({ id }));
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      dispatch(setLoading({ isLoading: false }));
    }
  }
);

export const editTaskThunk = createAsyncThunk(
  "todo/editTodoList",
  async (value: TodoList, { dispatch }) => {
    dispatch(setLoading({ isLoading: true }));
    console.log(value.id);
    try {
      const res = await instance.put<TodoList>(`todos/${value.id}`, value);

      dispatch(editTask({ task: res.data }));
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      dispatch(setLoading({ isLoading: false }));
    }
  }
);

export const isCompletedTaskThunk = createAsyncThunk(
  "todo/isCompletedTaskThunk",
  async (value: TodoList, { dispatch }) => {
    dispatch(setLoading({ isLoading: true }));
    try {
      const res = await instance.put<TodoList>(`todos/${value.id}`, value);
      dispatch(completeTask({ isDone: res.data }));
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      dispatch(setLoading({ isLoading: false }));
    }
  }
);
