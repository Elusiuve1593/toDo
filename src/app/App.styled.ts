import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;
  background-color: #FFFACD;
`;

export const Main = styled.div`
  flex: 1 1 auto;
`;

export const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 15px;
  @media (max-width: 1330px) {
    max-width: 970px;
  }

  @media (max-width: 991.98px) {
    max-width: 750px;
  }

  @media (max-width: 767.98px) {
    max-width: none;
    margin: 0px 15px;
  }
`;
