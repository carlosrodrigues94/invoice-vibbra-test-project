import styled from "styled-components";

export const Container = styled.div`
  label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 16px 0;
    margin: 8px auto 8px 0;

    span {
      font-size: 14px;
      margin: 0 0 0 8px;
      color: ${({ theme }) => theme.colors.text};
    }

    > svg {
      margin-bottom: 4px;
    }

    > input {
      display: none;
    }

    &:hover {
      cursor: pointer;
      span {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;
