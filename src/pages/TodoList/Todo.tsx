import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentTaskPage, tasksPerPage } from "../../redux/pagination/selector";
import { AppDispatch } from "../../redux/store";
import { fetchTasksThunk } from "../../redux/todo/operations";
import { fetchTodo } from "../../redux/todo/selector";
import { Preloader } from "../../helpers/Preloader/Preloader";
import { Pagination } from "../Pagination/Pagination";
import { AddTask } from "./AddTask/AddTask";
import { TasksList } from "./TasksList/TasksList";
import { TodoContainer } from "./Todo.styled";

export const Todo = () => {
  const todoList = useSelector(fetchTodo);
  const dispatch: AppDispatch = useDispatch();

  const taskPage = useSelector(tasksPerPage);
  const page = useSelector(currentTaskPage);
  const lastTaskPage = page * taskPage;
  const firstTaskPage = lastTaskPage - taskPage;
  const currentPage = todoList.slice(firstTaskPage, lastTaskPage);

  useEffect(() => {
    dispatch(fetchTasksThunk());
  }, []);
  return (
    <TodoContainer>
      <Preloader />

      <AddTask />

      <TasksList currentPage={currentPage} />

      <Pagination
        todoList={todoList}
        taskPage={taskPage}
        firstTaskPage={firstTaskPage}
        page={page}
        lastTaskPage={lastTaskPage}
      />
    </TodoContainer>
  );
};
