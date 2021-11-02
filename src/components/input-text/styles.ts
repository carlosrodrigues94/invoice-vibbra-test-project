import styled from "styled-components";

export const Container = styled.div`
  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
    width: 100%;

    > input {
      height: 50px;
      border-radius: 4px;
      padding: 0 0 0 8px;
      border: 0;
      width: 80%;
      margin: 4px 0 0 0;
    }
  }
`;
