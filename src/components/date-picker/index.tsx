import React from "react";

import ReactDatePicker, { registerLocale } from "react-datepicker";

import { ptBR } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { Container } from "./styles";

registerLocale("pt-BR", ptBR);

export type DatePickerProps = {
  value: Date;
  onChangeDate: (date: Date) => void;
  title: string;
};

const DatePicker: React.FC<DatePickerProps> = ({
  value = new Date(),
  onChangeDate,
  title,
}) => {
  return (
    <Container>
      <span>{title}</span>
      <ReactDatePicker
        className="date-picker"
        locale="pt-BR"
        dateFormat="dd/MM/yyyy"
        dateFormatCalendar="MMMM yyyy"
        selected={value}
        startDate={value}
        onChange={onChangeDate}
      />
    </Container>
  );
};

export { DatePicker };
