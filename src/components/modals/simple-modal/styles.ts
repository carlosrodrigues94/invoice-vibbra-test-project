import styled from "styled-components";
import { darken } from "polished";

type ContainerProps = {
  isOpen: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 100;
  background: ${({ theme }) => theme.colors.backgroundModal};
  transition: all 0.3s;
  transform-origin: left;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;

  > div {
    animation: showModalAnimation 0.3s ease-in-out normal;
    @keyframes showModalAnimation {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondary};
  transition: all 0.3s;
  min-height: 300px;
  height: auto;
  min-width: 400px;
  border-radius: 4px;

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    border-radius: 4px 4px 0 0;
    background: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }

  footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    button {
      width: 150px;
      height: 40px;
      border-radius: 4px;
      background: ${({ theme }) => theme.colors.primary};
      margin-top: auto;
      margin-bottom: 8px;
      border: 0;
      color: ${({ theme }) => theme.colors.text};

      &:hover {
        background: ${({ theme }) => darken(0.03, theme.colors.primary)};
      }
    }
  }

  button + button {
    background: ${({ theme }) => theme.colors.danger};
    &:hover {
      background: ${({ theme }) => darken(0.03, theme.colors.danger)};
    }
  }
`;
