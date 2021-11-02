import styled from "styled-components";

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  flex: 1;
  width: 100%;
  margin: 8px 0;

  .input-register-expense {
    width: 80%;
  }

  input:disabled {
    background: ${({ theme }) => theme.colors.secondaryDarken};
  }

  .company-found {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 8px 0;

    > button {
      height: 50px;
    }

    button + button {
      background: none;
      margin: 0 0 0 8px;
      width: 30px;
      height: 30px;
      border: 0;
      &:hover {
        background: ${({ theme }) => theme.colors.danger};
      }
    }
  }

  ul {
    width: 100%;
    animation: show-ul 0.3s linear normal;
    transform-origin: bottom;
    padding: 0 4px;
    max-height: 300px;
    overflow-y: auto;

    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 40px;
      padding: 2px 8px;
      border: 1px solid ${({ theme }) => theme.colors.whiteTransparent};
      margin: 8px 2px;
      border-radius: 4px;

      button {
        margin-left: auto;
        height: 30px;
        margin-right: 2px;
      }
    }
  }

  @keyframes show-ul {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }
`;

export const ContentInputs = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  width: 100%;
  flex-direction: column;

  > h4 {
    margin: 8px 0 16px 16px;
  }
`;
