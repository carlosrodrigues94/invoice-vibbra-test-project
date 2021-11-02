import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart } from "../../../../components/charts";
import { IState } from "../../../../store";
import { actionIndexInvoiceByMonthRequest } from "../../../../store/modules/invoices/actions";
import { IInvoicesState } from "../../../../store/modules/invoices/types";
import { months } from "../../../../utils/months";
import { formatCurrency } from "../../../../utils/masks/moneyMask";
import { Container, ContentDetails } from "./styles";
import InputCheckbox from "components/input-checkbox";
import SelectYear from "components/select-year";
const ChartInvoicesRegisteredByMonth: React.FC = () => {
  const dispatch = useDispatch();

  const [enableDataLabels, setEnableDataLabels] = useState(true);

  const {
    data: { invoices, invoicesByMonth },
  } = useSelector<IState, IInvoicesState>((state) => state.invoices);

  const handleChangeYearFilter = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const year = Number(event.target.value);

      if (!year) return;

      dispatch(actionIndexInvoiceByMonthRequest({ yearSelected: year }));
    },
    [dispatch]
  );

  useEffect(() => {
    const yearSelected = new Date().getFullYear();
    dispatch(actionIndexInvoiceByMonthRequest({ yearSelected }));
  }, [dispatch, invoices]);

  return (
    <Container>
      <BarChart
        title="Valor de Notas Fiscais Geradas Mês a Mês"
        series={[
          {
            data: invoicesByMonth.invoices.map(
              (invoice) => invoice.value / 100
            ),
            name: "Valor de NF Geradas",
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
            optionData={invoicesByMonth.years}
            onChange={handleChangeYearFilter}
            value={invoicesByMonth.yearSelected}
          />
        </ContentDetails>
      </BarChart>
    </Container>
  );
};

export default ChartInvoicesRegisteredByMonth;
