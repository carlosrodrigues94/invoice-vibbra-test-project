import { darken } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 2;
  grid-template-rows: 2;
  flex-wrap: wrap;
  min-height: 100vh;
  width: 100%;
  padding: 10px 10px 10px 50px;

  button {
    padding: 6px;
    height: 50px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => darken(0.03, props.theme.colors.secondary)};
    border: 1px solid ${(props) => props.theme.colors.whiteTransparent};
    color: ${(props) => props.theme.colors.text};
    margin: 8px;

    &:hover {
      background: ${(props) => props.theme.colors.primary};
    }
  }
`;
