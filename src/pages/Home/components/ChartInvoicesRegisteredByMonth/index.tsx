import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { BarChart } from "../../../../components/charts";
import { IState } from "../../../../store";
import { IInvoicesState } from "../../../../store/modules/invoices/types";
import { months } from "../../../../utils";
import { formatCurrency } from "../../../../utils/masks";
import { Container } from "./styles";
const ChartInvoicesRegisteredByMonth: React.FC = () => {
  const [invoiceYears, setInvoiceYears] = useState<number[]>([]);
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  const {
    data: { invoices },
  } = useSelector<IState, IInvoicesState>((state) => state.invoices);

  const invoicesByMonth = useMemo(() => {
    return months.map(({ shortName }) => {
      return invoices
        .filter((item) => item.month === shortName)
        .filter(
          (item) => new Date(item.dateReceived).getFullYear() === yearSelected
        )
        .map((item) => ({ month: item.month, value: item.valueUnmasked }))
        .reduce(
          (prev, curr) => {
            return { month: shortName, value: prev.value + curr.value };
          },
          { month: shortName, value: 0 }
        );
    });
  }, [invoices, yearSelected]);

  const handleChangeYearFilter = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const year = Number(event.target.value);

      if (!year) return;

      setYearSelected(year);
    },
    []
  );

  useEffect(() => {
    const yearsFiltered = new Set(
      invoices.map((invoices) => new Date(invoices.dateReceived).getFullYear())
    );

    const years = Array.from(yearsFiltered);

    setInvoiceYears(years);
  }, [invoices]);

  return (
    <Container>
      <BarChart
        title="Valor de Notas Fiscais Geradas Mês a Mês"
        series={[
          {
            data: invoicesByMonth.map((invoice) => invoice.value / 100),
            name: "Valor de NF Geradas",
          },
        ]}
        formatter={formatCurrency}
        categories={months.map((month) => month.shortName)}
        categorieType="category"
      >
        <select onChange={handleChangeYearFilter}>
          <option disabled>Selecione o Ano</option>
          {invoiceYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </BarChart>
    </Container>
  );
};

export default ChartInvoicesRegisteredByMonth;
