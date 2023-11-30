import { useState } from "react";
import {
  TodoList,
  deleteTaskThunk,
  editTaskThunk,
  isCompletedTaskThunk,
} from "../../../redux/todo/operations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { FaRegEdit } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { LuTrash } from "react-icons/lu";
import {
  EditButton,
  CheckBox,
  EditInput,
  TaskListContainer,
  TasksContainer,
  Title,
  DeleteButton,
} from "./TaskList.styled";

interface TasksListInterface {
  currentPage: TodoList[];
}

export const TasksList = ({ currentPage }: TasksListInterface) => {
  const dispatch: AppDispatch = useDispatch();

  const [isCompleted, setCompleted] = useState<{ [key: number]: boolean }>();
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

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

  const editTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.currentTarget.value);
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setEditMode(null);
    }
  };

  const deleteTaskHandler = (id: number) => {
    dispatch(deleteTaskThunk(id));
  };

  return (
    <TaskListContainer>
      {currentPage.map(({ id, title }) => (
        <TasksContainer key={id}>
          <CheckBox
            type="checkbox"
            checked={(isCompleted && isCompleted[id]) || false}
            onChange={() =>
              toggleCheckboxHandler(
                id,
                (isCompleted && isCompleted[id]) || false
              )
            }
          />

          {editMode === id ? (
            <EditInput
              autoFocus
              type="text"
              value={editTitle}
              onChange={editTitleHandler}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <Title isCompleted={isCompleted && isCompleted[id]}>{title}</Title>
          )}

          <EditButton
            onClick={() =>
              editMode === id ? updateTaskHandler(id) : editTaskHandler(id)
            }
          >
            {editMode === id ? (
              <MdDoneOutline size={23} color="#1a9340" />
            ) : (
              <FaRegEdit size={23} color="#FF7F50" />
            )}
          </EditButton>

          <DeleteButton type="button" onClick={() => deleteTaskHandler(id)}>
            <LuTrash size={23} color="#db2828" />
          </DeleteButton>
        </TasksContainer>
      ))}
    </TaskListContainer>
  );
};
