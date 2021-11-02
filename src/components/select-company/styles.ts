import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
  width: 100%;

  label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  select {
    height: 50px;
    border-radius: 4px;
    border: 0;
    width: 80%;
    font-size: 16px;
    text-transform: capitalize;
    padding: 0 0 0 8px;
    margin: 8px 0;
  }
`;
