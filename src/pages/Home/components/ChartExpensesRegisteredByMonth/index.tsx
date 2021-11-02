import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart } from "../../../../components/charts";
import { IState } from "../../../../store";
import { actionIndexExpensesByMonthRequest } from "../../../../store/modules/expenses/actions";
import { IExpensesState } from "../../../../store/modules/expenses/types";
import { months } from "../../../../utils/months";
import { formatCurrency } from "../../../../utils/masks/moneyMask";
import { Container, ContentDetails } from "./styles";
import InputCheckbox from "components/input-checkbox";
import SelectYear from "components/select-year";

const ChartExpensesRegisteredByMonth: React.FC = () => {
  const dispatch = useDispatch();

  const [enableDataLabels, setEnableDataLabels] = useState(true);

  const {
    data: { expensesByMonth, expenses },
  } = useSelector<IState, IExpensesState>((state) => state.expenses);

  const handleChangeYearFilter = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const year = Number(event.target.value);

      if (!year) return;

      dispatch(actionIndexExpensesByMonthRequest({ yearSelected: year }));
    },
    [dispatch]
  );

  useEffect(() => {
    const year = new Date().getFullYear();
    dispatch(actionIndexExpensesByMonthRequest({ yearSelected: year }));
  }, [dispatch, expenses]);

  return (
    <Container>
      <BarChart
        title="Valor de Despesas Mês a Mês"
        series={[
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
            optionData={expensesByMonth.years}
            onChange={handleChangeYearFilter}
            value={expensesByMonth.yearSelected}
          />
        </ContentDetails>
      </BarChart>
    </Container>
  );
};

export default ChartExpensesRegisteredByMonth;
