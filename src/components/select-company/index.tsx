import React, { SelectHTMLAttributes } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../store";
import { ICompaniesState } from "../../store/modules/companies/types";

import { Container } from "./styles";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  onChangeCompany: (companyId: string) => void;
  value: string;
}

const SelectCompany: React.FC<SelectProps> = ({
  title,
  value,
  onChangeCompany,
  ...rest
}) => {
  const {
    data: { companies },
  } = useSelector<IState, ICompaniesState>((state) => state.companies);

  return (
    <Container>
      <label htmlFor="input-select-company">
        {title}
        <select
          id="input-select-company"
          onChange={(event) => onChangeCompany(event.target.value)}
          value={value}
          {...rest}
        >
          <option disabled>Selecione a empresa</option>
          {companies.map((company) => (
            <option value={company.id} key={company.id}>
              {company.socialName}
            </option>
          ))}
        </select>
      </label>
    </Container>
  );
};

export { SelectCompany };
