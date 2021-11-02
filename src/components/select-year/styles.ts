import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  select {
    width: 100%;
    height: 35px;
    border-radius: 4px;
    padding: 0 0 0 8px;
    border: 1px solid ${({ theme }) => theme.colors.whiteTransparent};
    color: ${({ theme }) => theme.colors.text};
    background: none;
    margin: 8px 0 4px 0;
  }
`;
