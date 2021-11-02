import React, { SelectHTMLAttributes } from "react";
import { months } from "../../utils/months";

import { Container } from "./styles";

export interface SelectMonthProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
}

const SelectMonth: React.FC<SelectMonthProps> = ({ title, ...rest }) => {
  return (
    <Container>
      <label htmlFor="input-month-invoice">
        <span>{title}</span>
        <select {...rest}>
          <option disabled>{title}</option>
          {months.map((month) => (
            <option value={month.shortName}>{month.fullName}</option>
          ))}
        </select>
      </label>
    </Container>
  );
};

export { SelectMonth };
