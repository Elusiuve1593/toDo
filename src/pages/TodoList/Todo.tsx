import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  addTaskThunk,
  deleteTaskThunk,
  editTaskThunk,
  fetchTasksThunk,
  isCompletedTaskThunk,
} from "../../redux/todo/operations";
import { fetchTodo } from "../../redux/todo/selector";
import { TodoContainer } from "./Todo.styled";
import { currentTaskPage, tasksPerPage } from "../../redux/pagination/selector";
import { Pagination } from "../Pagination/Pagination";
import toast from "react-hot-toast";
import { preloader } from "../../redux/preloader/selector";

export const Todo = () => {
  const todoList = useSelector(fetchTodo);
  const isLoading = useSelector(preloader);
  const dispatch: AppDispatch = useDispatch();

  const [titleValue, setTitleValue] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");
  const [isCompleted, setCompleted] = useState<{ [key: number]: boolean }>();
  const [editMode, setEditMode] = useState<number | null>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.currentTarget.value);
  };
  const editTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.currentTarget.value);
  };

  const addTaskHandler = () => {
    if (titleValue.trim() === "") {
      return;
    }
    const value = {
      id: Date.now(),
      title: titleValue,
      completed: false,
    };
    dispatch(addTaskThunk(value));
    setTitleValue("");
  };

  const deleteTaskHandler = (id: number) => {
    dispatch(deleteTaskThunk(id));
  };

  const editTaskHandler = (id: number) => {
    setEditMode(id);
  };

  const updateTaskHandler = (id: number) => {
    if (!editTitle) {
      return toast("Put a message, please");
    }
    const value = {
      id: id,
      title: editTitle,
    };
    dispatch(editTaskThunk(value));
    setEditMode(null);
    setEditTitle("");
  };

  const toggleCheckboxHandler = (id: number, completed: boolean) => {
    const updatedCompletedStates = {
      ...isCompleted,
      [id]: !completed,
    };

    setCompleted(updatedCompletedStates);
    const value = {
      id: id,
      completed: !completed,
    };
    dispatch(isCompletedTaskThunk(value));
  };

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
      {isLoading && <div style={{ color: "blue" }}>Loading...</div>}
      
      <input
        type="text"
        autoFocus
        placeholder="Make your task"
        value={titleValue}
        onChange={onChangeHandler}
      />

      <button type="button" onClick={addTaskHandler}>
        Add Todo
      </button>

      {currentPage.map(({ id, title }, index) => (
        <div key={id}>
          <input
            type="checkbox"
            checked={(isCompleted && isCompleted[id]) || false}
            onChange={() =>
              toggleCheckboxHandler(
                id,
                (isCompleted && isCompleted[id]) || false
              )
            }
            style={{ display: "inline-block" }}
          />

          {editMode === id ? (
            <input
              autoFocus
              type="text"
              value={editTitle}
              onChange={editTitleHandler}
            />
          ) : (
            <div style={{ padding: "20px", display: "inline-block" }}>
              {title}
            </div>
          )}

          <button
            onClick={() =>
              editMode === id ? updateTaskHandler(id) : editTaskHandler(id)
            }
            style={{ marginRight: "10px", padding: "30px" }}
          >
            {editMode === id ? "update" : "edit"}
          </button>

          <button type="button" onClick={() => deleteTaskHandler(id)}>
            delete
          </button>
        </div>
      ))}

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
