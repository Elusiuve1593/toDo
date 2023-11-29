import { useSelector } from "react-redux";
import { Todo } from "../pages/TodoList/Todo";
import { Container, Main, Wrapper } from "./App.styled";
import { preloader } from "../redux/preloader/selector";

export const App = () => {
  const isLoading = useSelector(preloader);
  return (
    <Wrapper>
      <Main>
        <Container>
          {isLoading && <div style={{ color: "blue" }}>"Fuck you"</div>}
          <Todo />
        </Container>
      </Main>
    </Wrapper>
  );
};
