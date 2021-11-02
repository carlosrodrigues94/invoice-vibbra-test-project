import React, { InputHTMLAttributes } from "react";

import { Container } from "./styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

const InputText: React.FC<InputProps> = ({ title, ...rest }) => {
  return (
    <Container>
      <label htmlFor="input-description-invoice">
        {title}
        <input placeholder="ex: Manutenção" {...rest} />
      </label>
    </Container>
  );
};

export { InputText };
