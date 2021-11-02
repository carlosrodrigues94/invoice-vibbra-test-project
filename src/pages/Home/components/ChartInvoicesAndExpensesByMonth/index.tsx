import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { BarChart } from "../../../../components/charts";
import { IState } from "../../../../store";
import { actionIndexExpensesByMonthRequest } from "../../../../store/modules/expenses/actions";
import { IExpensesState } from "../../../../store/modules/expenses/types";
import { months } from "../../../../utils/months";
import { formatCurrency } from "../../../../utils/masks/moneyMask";
import { Container, ContentDetails } from "./styles";
import { ThemeContext } from "styled-components";
import { IInvoicesState } from "store/modules/invoices/types";
import { actionIndexInvoiceByMonthRequest } from "store/modules/invoices/actions";
import InputCheckbox from "components/input-checkbox";
import SelectYear from "components/select-year";

const ChartInvoicesAndExpensesByMonth: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);

  const [enableDataLabels, setEnableDataLabels] = useState(true);
  const [years, setYears] = useState<number[]>([new Date().getFullYear()]);

  const {
    data: { expensesByMonth, expenses },
  } = useSelector<IState, IExpensesState>((state) => state.expenses);

  const {
    data: { invoicesByMonth },
  } = useSelector<IState, IInvoicesState>((state) => state.invoices);

  const handleChangeYearFilter = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const year = Number(event.target.value);

      if (!year) return;

      dispatch(actionIndexExpensesByMonthRequest({ yearSelected: year }));
      dispatch(actionIndexInvoiceByMonthRequest({ yearSelected: year }));
    },
    [dispatch]
  );

  useEffect(() => {
    const year = new Date().getFullYear();

    dispatch(actionIndexExpensesByMonthRequest({ yearSelected: year }));
    dispatch(actionIndexInvoiceByMonthRequest({ yearSelected: year }));
  }, [dispatch, expenses]);

  useEffect(() => {
    const yearsFiltered = new Set([
      ...expensesByMonth.years,
      ...invoicesByMonth.years,
    ]);

    const years = Array.from(yearsFiltered);

    setYears(years);
  }, [expensesByMonth, invoicesByMonth]);

  return (
    <Container>
      <BarChart
        title="Valor de Notas e Despeasas Mês a Mês"
        barColors={{ colors: [theme.colors.success, theme.colors.danger] }}
        series={[
          {
            data: invoicesByMonth.invoices.map(
              (invoice) => invoice.value / 100
            ),
            name: "Valor de Notas",
          },
          {
            data: expensesByMonth.expenses.map(
              (expense) => expense.value / 100
            ),
            name: "Valor de Despesas",
          },
        ]}
        formatter={formatCurrency}
        categories={months.map((month) => month.shortName)}
        categorieType="category"
        enableDataLabels={enableDataLabels}
      >
        <ContentDetails>
          <InputCheckbox
            text="Mostrar detalhes do Gráfico"
            isChecked={enableDataLabels}
            checked={enableDataLabels}
            onChange={(event) => {
              setEnableDataLabels(event.target.checked);
            }}
          />

          <SelectYear
            onChange={handleChangeYearFilter}
            value={invoicesByMonth.yearSelected}
            optionData={invoicesByMonth.years}
          />
        </ContentDetails>
      </BarChart>
    </Container>
  );
};

export default ChartInvoicesAndExpensesByMonth;
