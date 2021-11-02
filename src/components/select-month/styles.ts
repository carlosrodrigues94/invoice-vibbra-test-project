import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  label {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 8px 0;
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
