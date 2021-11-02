import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  margin: 8px 0;

  > span {
    margin: 0 0 8px 0;
  }

  .react-datepicker__input-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .date-picker {
    height: 50px;
    border-radius: 4px;
    padding: 0 0 0 8px;
    border: 0;
    width: 80%;
  }
`;
