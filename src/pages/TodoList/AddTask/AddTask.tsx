import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../../redux/todo/operations";
import { AppDispatch } from "../../../redux/store";
import toast from "react-hot-toast";
import { CiSquarePlus } from "react-icons/ci";
import {
  AddTaskContainer,
  Button,
  Input,
  Line,
  TaskContainer,
} from "./AddTask.styled";

export const AddTask = () => {
  const dispatch: AppDispatch = useDispatch();

  const [titleValue, setTitleValue] = useState<string>("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.currentTarget.value);
  };

  const addTaskHandler = () => {
    if (!titleValue) {
      return toast("Put a message, please");
    }
    const value = {
      id: Date.now(),
      title: titleValue,
      completed: false,
    };
    dispatch(addTaskThunk(value));
    setTitleValue("");
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTaskHandler();
    }
  };
  return (
    <AddTaskContainer>
      <TaskContainer>
        <Input
          type="text"
          autoFocus
          placeholder="Make your task"
          value={titleValue}
          onChange={onChangeHandler}
          onKeyDown={handleKeyDown}
        />
        <Button type="button" onClick={addTaskHandler}>
          <CiSquarePlus size={36} color="#FF7F50" />
        </Button>
        <Line />
      </TaskContainer>
    </AddTaskContainer>
  );
};
