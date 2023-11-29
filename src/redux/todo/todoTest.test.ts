import { TodoList } from "./operations";
import todoSlice from "./slice"
import { completeTask, createTask, deleteTask, editTask, fetchTasks } from "./slice";

describe("todoSlice", () => {
    it("should handle fetchTasks", () => {
      const prevState: TodoList[] = [{ id: 1, title: "Task 1", completed: false }];
      const actionPayload = { todo: [{ id: 2, title: "Task 2", completed: true }] };
  
      const nextState = todoSlice(prevState, fetchTasks(actionPayload));
      expect(nextState).toEqual(actionPayload.todo);
    });
  
    it("should handle createTask", () => {
      const prevState: TodoList[] = [{ id: 1, title: "Task 1", completed: false }];
      const actionPayload = { task: { id: 2, title: "Task 2", completed: true } };
  
      const nextState = todoSlice(prevState, createTask(actionPayload));
      expect(nextState).toEqual([actionPayload.task, ...prevState]);
    });
  
    it("should handle deleteTask", () => {
      const prevState: TodoList[] = [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
      ];
      const actionPayload = { id: 1 };
  
      const nextState = todoSlice(prevState, deleteTask(actionPayload));
      expect(nextState).toEqual([{ id: 2, title: "Task 2", completed: true }]);
    });
  
    it("should handle editTask", () => {
      const prevState: TodoList[] = [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
      ];
      const actionPayload = { task: { id: 2, title: "Updated Task", completed: true } };
  
      const nextState = todoSlice(prevState, editTask(actionPayload));
      expect(nextState).toEqual([
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Updated Task", completed: true },
      ]);
    });
  
    it("should handle completeTask", () => {
      const prevState: TodoList[] = [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
      ];
      const actionPayload = { isDone: { id: 1, title: "Task 1", completed: true } };
  
      const nextState = todoSlice(prevState, completeTask(actionPayload));
      expect(nextState).toEqual([
        { id: 1, title: "Task 1", completed: true },
        { id: 2, title: "Task 2", completed: true },
      ]);
    });
  });