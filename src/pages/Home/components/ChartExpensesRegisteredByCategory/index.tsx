import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart } from "../../../../components/charts";
import { IState } from "../../../../store";
import { actionIndexExpensesByCategoryRequest } from "../../../../store/modules/expenses/actions";
import { IExpensesState } from "../../../../store/modules/expenses/types";
import { formatCurrency } from "../../../../utils/masks/moneyMask";
import { Container, ContentDetails } from "./styles";
import InputCheckbox from "components/input-checkbox";
import SelectYear from "components/select-year";

const ChartExpensesRegisteredByCategory: React.FC = () => {
  const dispatch = useDispatch();

  const [enableDataLabels, setEnableDataLabels] = useState(true);

  const {
    data: { expensesByCategory, expenses },
    loading,
  } = useSelector<IState, IExpensesState>((state) => state.expenses);

  const handleChangeYearFilter = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const year = Number(event.target.value);

      if (!year) return;

      dispatch(actionIndexExpensesByCategoryRequest({ yearSelected: year }));
    },
    [dispatch]
  );

  useEffect(() => {
    const year = new Date().getFullYear();
    dispatch(actionIndexExpensesByCategoryRequest({ yearSelected: year }));
  }, [dispatch, expenses]);

  if (loading) return <></>;

  return (
    <Container>
      <BarChart
        title="Valor de Despesas Mês a Mês por Categoria"
        series={[
          {
            data: expensesByCategory.data.map((expense) => expense.value / 100),
            name: "Valor de Despesas",
          },
        ]}
        formatter={formatCurrency}
        categories={expensesByCategory.data.map(
          (expense) => expense.category.name
        )}
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
            optionData={expensesByCategory.years}
            onChange={handleChangeYearFilter}
            value={expensesByCategory.yearSelected}
          />
        </ContentDetails>
      </BarChart>
    </Container>
  );
};

export default ChartExpensesRegisteredByCategory;
