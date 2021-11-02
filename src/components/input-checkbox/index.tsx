import React, { InputHTMLAttributes } from "react";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { v4 } from "uuid";

import { Container } from "./styles";

export interface InputCheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  text: string;
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  isChecked,
  onChange,
  text,
  ...rest
}) => {
  const labelId = v4();
  return (
    <Container>
      <label htmlFor={labelId}>
        {isChecked ? <FaCheckSquare /> : <FaRegSquare />}
        <input id={labelId} type="checkbox" onChange={onChange} {...rest} />
        <span>{text}</span>
      </label>
    </Container>
  );
};

export default InputCheckbox;
