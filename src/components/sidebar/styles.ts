import { darken } from "polished";
import styled, { css } from "styled-components";

interface ContainerProps {
  isOpen: boolean;
}

export const Container = styled.ul<ContainerProps>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 350px;
  border-radius: 0 2px 2px 0;
  background: ${({ theme }) => theme.colors.secondaryDarken};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  transition: all 1s;
  border-right: 1px solid ${({ theme }) => theme.colors.whiteTransparent};
  z-index: 10;

  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 4px;
    height: 50px;
    width: 100%;
    position: relative;

    svg {
      margin: 0 8px;
    }

    &:hover {
      background: ${({ theme }) => darken(0.05, theme.colors.secondaryDarken)};
      cursor: pointer;
    }
  }

  .switch-button {
    position: relative;
  }

  .icon-checked {
    margin-top: auto;
    position: absolute;
    top: 5px;
    left: 4px;
  }

  .icon-unchecked {
    margin-top: auto;
    position: absolute;
    right: 4px;
    top: 5px;
    color: ${({ theme }) => theme.colors.white};
  }

  .button-and-switch-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 4px;
    height: 50px;
    width: 100%;
    &:hover {
      background: none;
    }
  }

  ${({ isOpen }) => {
    if (isOpen) return css``;
    return css`
      transform: translateX(-312px);
    `;
  }}
`;

export const ButtonHamburger = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  color: ${({ theme }) => theme.colors.text};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.whiteTransparent};
  margin-left: auto;
  margin-right: 2px;
  border-radius: 2px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;
