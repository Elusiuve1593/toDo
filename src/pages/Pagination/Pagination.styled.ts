import styled from "styled-components";

interface PageProps {
  active?: boolean;
}

export const PaginationContainer = styled.div`
  position: relative;
  padding: 25px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  outline: none;
  :hover {
    color: #ff7f50;
  }
`;

export const PaginationSpan = styled.span<PageProps>`
  border-bottom: ${(props) => (props.active ? "3px solid #db2828" : "none")};
`;

export const PaginationButton = styled.button<PageProps>`
  cursor: pointer;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 10px 10px 5px 10px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  font-size: ${(props) => (props.active ? "19px" : "16.5px")};
`;

export const Line = styled.div`
  position: absolute;
  opacity: 0.6;
  top: 0px;
  left: 10px;
  width: 30%;
  height: 2px;
  background-color: #FF7F50;
  content: "";
  @media (max-width: 767.98px) {
    /* width: 50%; */
    /* top: 70px; */
    left: 25%;
    width: 45%;
  }
`;