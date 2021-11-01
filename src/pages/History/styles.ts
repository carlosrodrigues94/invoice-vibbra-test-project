import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
  padding: 10px 10px 10px 50px;
  flex-direction: column;

  ul {
    width: 100%;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 8px 16px;
    border: 1px solid ${({ theme }) => theme.colors.whiteTransparent};
    margin: 8px 0;

    button {
      margin: 0 4px;
      background: none;
      border: 1px solid ${({ theme }) => theme.colors.whiteTransparent};
      color: ${({ theme }) => theme.colors.text};
      padding: 4px;
      border-radius: 4px;

      &:hover {
        background: ${({ theme }) => theme.colors.danger};
      }
    }

    button + button {
      &:hover {
        background: ${({ theme }) => theme.colors.info};
      }
    }

    > p + button {
      margin-left: auto;
    }

    > p + p {
      margin-left: 16px;
    }

    b {
      min-width: 100px;
      margin: 0 20px;
      color: ${({ theme }) => theme.colors.success};
    }
  }

  ul + h1 {
    margin-top: 24px;
  }

  .list-expenses {
    b {
      color: ${({ theme }) => theme.colors.danger};
    }
  }
`;
