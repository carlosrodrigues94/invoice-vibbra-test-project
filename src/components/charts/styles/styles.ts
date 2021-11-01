import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-width: 600px;
  padding: 8px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.whiteTransparent};
  border-radius: 4px;
  margin: 4px;
  flex-direction: column;
  height: auto;

  h4 {
    margin-bottom: auto;
    margin-top: 8px;
  }
`;
