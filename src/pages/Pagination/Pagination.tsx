import { useDispatch } from "react-redux";
import {
  nextPage,
  previousPage,
  setCurrentPage,
} from "../../redux/pagination/slice";
import { AppDispatch } from "../../redux/store";
import { TodoList } from "../../redux/todo/operations";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import {
  Button,
  Line,
  PaginationButton,
  PaginationContainer,
  PaginationSpan,
} from "./Pagination.styled";

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
    if (page < Math.ceil(todoList.length / taskPage)) {
      dispatch(nextPage());
    }
  };
  return (
    <PaginationContainer>
      <Button
        disabled={firstTaskPage === 0}
        onClick={onClickPreviousPageHandler}
      >
        <FaChevronLeft size={20} />
      </Button>

      {pageNumbers.map((pageNumber) => (
        <PaginationSpan
          active={page === pageNumber}
          key={pageNumber}
          onClick={() => onClickPaginateNumberHandler(pageNumber)}
        >
          <PaginationButton active={page === pageNumber}>
            {pageNumber}
          </PaginationButton>
        </PaginationSpan>
      ))}
      
      <Line />

      <Button
        disabled={page >= Math.ceil(todoList.length / taskPage)}
        onClick={onClickNextPageHandler}
      >
        <FaChevronRight size={20} />
      </Button>
    </PaginationContainer>
  );
};
