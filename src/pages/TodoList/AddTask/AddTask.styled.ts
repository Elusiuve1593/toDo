import styled from "styled-components";

export const AddTaskContainer = styled.div`
  position: relative;
  min-height: 70px;
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const TaskContainer = styled.div`
  display: flex;
  margin-right: 50px;
  @media (max-width: 767.98px) {
    margin: 0 auto;
  }
`;

export const Input = styled.input`
  font-size: 15.5px;
  margin: 3px 0 0 0;
  max-width: 500px;
  height: 27px;
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  outline: none;
`;

export const Line = styled.div`
  position: absolute;
  opacity: 0.6;
  top: 65px;
  right: 60px;
  width: 30%;
  height: 2px;
  background-color: #ff7f50;
  content: "";
  @media (max-width: 767.98px) {
    top: 70px;
    left: 25%;
    width: 45%;
  }
`;
