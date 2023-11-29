import { useDispatch } from "react-redux";
import {
  nextPage,
  previousPage,
  setCurrentPage,
} from "../../redux/pagination/slice";
import { AppDispatch } from "../../redux/store";
import { TodoList } from "../../redux/todo/operations";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

interface PaginationInterface {
  todoList: TodoList[];
  taskPage: number;
  firstTaskPage: number;
  page: number;
  lastTaskPage: number;
}

export const Pagination = ({
  todoList,
  taskPage,
  firstTaskPage,
  page,
  lastTaskPage,
}: PaginationInterface) => {
  const dispatch: AppDispatch = useDispatch();

  const pageNumbers: number[] = [];
  for (let i: number = 1; i <= Math.ceil(todoList.length / taskPage); i++) {
    pageNumbers.push(i);
  }

  const onClickPreviousPageHandler = () => {
    dispatch(previousPage());
  };
  const onClickPaginateNumberHandler = (pageNumber: number) => {
    dispatch(setCurrentPage({ pageNumber }));
  };
  const onClickNextPageHandler = () => {
    dispatch(nextPage());
  };
  return (
    <div>
      <button
        disabled={firstTaskPage === 0}
        onClick={onClickPreviousPageHandler}
      >
        <svg style={{ width: "20px", height: "20px" }}>{<FaChevronLeft />}</svg>
      </button>

      {pageNumbers.map((pageNumber) => (
        <span
          style={
            page === pageNumber
              ? {
                  color: "#5876c5",
                  fontSize: "17.5px",
                  borderBottom: "3px solid #5876c5",
                  fontWeight: "bolder",
                }
              : { color: "#70778b" }
          }
          key={pageNumber}
          onClick={() => onClickPaginateNumberHandler(pageNumber)}
        >
          <button>{pageNumber}</button>
        </span>
      ))}
      <button
        disabled={todoList.length === lastTaskPage}
        onClick={onClickNextPageHandler}
      >
        <svg style={{ width: "20px", height: "20px" }}>
          {<FaChevronRight />}
        </svg>
      </button>
    </div>
  );
};
