import styled from "styled-components";

interface TitleProps {
  isCompleted?: boolean;
}

export const TaskListContainer = styled.div`
  padding: 10px;
  margin-bottom: 10px;
`;

export const TasksContainer = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  @media (max-width: 450px) {
    height: 30%;
  }
`;

export const CheckBox = styled.input`
  padding: 20px;
  cursor: pointer;
  transform: scale(1.4);
`;

export const EditInput = styled.input`
  font-size: 15px;
  margin: 0px 10px;
  max-width: 500px;
  height: 27px;
  @media (max-width: 450px) {
    max-width: 118px;
  }
`;

export const Title = styled.div<TitleProps>`
  color: ${(props) => (props.isCompleted ? "#808080" : "#000")};
  padding: 15px;
`;

export const EditButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  outline: none;
  margin-right: 8px;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  outline: none;
`;
