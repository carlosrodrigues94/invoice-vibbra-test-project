import { darken } from "polished";
import styled from "styled-components";

export const Container = styled.button`
  padding: 6px;
  height: 80px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => darken(0.03, props.theme.colors.secondary)};
  border: 1px solid ${(props) => props.theme.colors.secondaryDarken};
  color: ${(props) => props.theme.colors.text};
  margin: 8px;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
  }
`;
