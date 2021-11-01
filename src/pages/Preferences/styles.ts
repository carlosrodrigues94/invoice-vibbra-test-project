import { darken } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 10px 10px 10px 50px;
  overflow-y: auto;
  flex-direction: column;

  .div-modal-content {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    flex: 1;
    width: 100%;
  }

  .input-modal {
    height: 40px;
    width: 80%;
    border-radius: 4px;
    border: 0;
    padding: 0 0 0 4px;
    margin: 16px 0;
  }

  #label-revenue {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 16px;

    input {
      margin: 8px 0;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  ul {
    margin: 16px 0;
    width: 80%;
    border: 1px solid ${({ theme }) => theme.colors.whiteTransparent};
    padding: 8px;

    h4 {
      font-weight: bold;
    }

    li {
      list-style: none;
      margin: 8px 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .switch {
        margin: 0 0 0 8px;
      }

      button {
        padding: 2px 4px;
        border: 1px solid ${({ theme }) => theme.colors.whiteTransparent};
        background: ${({ theme }) => theme.colors.danger};
        color: ${({ theme }) => theme.colors.white};
        border-radius: 4px;
        margin: 0 0 0 8px;
      }
    }
  }
`;
