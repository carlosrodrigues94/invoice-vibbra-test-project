import React from "react";
import { Container, Content } from "./styles";
export type SimpleModalProps = {
  isOpen: boolean;
  onClickButtonOk: () => void;
  onClickButtonCancel?: () => void;
  buttonOkText: string;
  headerText?: string;
  buttonCancelText?: string;
};

const SimpleModal: React.FC<SimpleModalProps> = ({
  children,
  isOpen,
  onClickButtonOk,
  buttonOkText = "OK",
  headerText = "",
  buttonCancelText = "Fechar",
  onClickButtonCancel,
}) => {
  return (
    <Container isOpen={isOpen}>
      <Content>
        <header>{headerText}</header>
        {children}
        <footer>
          <button type="button" onClick={onClickButtonOk}>
            {buttonOkText}
          </button>
          {buttonCancelText && (
            <button type="button" onClick={onClickButtonCancel}>
              {buttonCancelText}
            </button>
          )}
        </footer>
      </Content>
    </Container>
  );
};

export { SimpleModal };
