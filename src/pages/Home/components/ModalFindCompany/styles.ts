import styled from "styled-components";

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  flex: 1;
  width: 100%;

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 4px 0;
    width: 100%;
    select {
      height: 30px;
    }
  }

  .input-modal {
    height: 40px;
    width: 90%;
    border-radius: 4px;
    border: 0;
    padding: 0 0 0 4px;
    margin: 16px 4px;
  }

  .company-found {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 8px 0;

    button {
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
`;
