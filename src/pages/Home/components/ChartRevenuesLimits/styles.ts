import styled from "styled-components";

export const ContentDescriptionChartRevenues = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 16px;

  span {
    margin: 4px 0;
    font-size: 14px;

    &:nth-child(1) {
      b {
        color: ${({ theme }) => theme.colors.info};
      }
    }

    &:nth-child(2) {
      b {
        color: ${({ theme }) => theme.colors.yellow};
      }
    }

    &:nth-child(3) {
      b {
        color: ${({ theme }) => theme.colors.danger};
      }
    }

    &:nth-child(4) {
      b {
        color: ${({ theme }) => theme.colors.success};
      }
    }
  }
`;
