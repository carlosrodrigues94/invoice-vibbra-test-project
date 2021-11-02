import React, { SelectHTMLAttributes } from "react";

import { Container } from "./styles";

export interface SelectYearProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  optionData: number[];
}

const SelectYear: React.FC<SelectYearProps> = ({ optionData, ...rest }) => {
  return (
    <Container>
      <select {...rest}>
        <option disabled>Selecione o Ano</option>
        {optionData.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default SelectYear;
