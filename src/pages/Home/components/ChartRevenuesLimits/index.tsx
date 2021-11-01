import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";
import { PieChart } from "../../../../components/charts/pie";
import { IState } from "../../../../store";
import { IConfigState } from "../../../../store/modules/config/types";
import { IInvoicesState } from "../../../../store/modules/invoices/types";
import { formatCurrency } from "../../../../utils/masks";
import { ContentDescriptionChartRevenues } from "./styles";

const limitRevenuesDefault = 8_100_000;

const ChartRevenuesLimits: React.FC = () => {
  const theme = useContext(ThemeContext);

  const [revenues, setRevenues] = useState(() => {
    return {
      available: Number(limitRevenuesDefault - 0),
      used: Number(limitRevenuesDefault - 0),
      total: limitRevenuesDefault,
    };
  });

  const {
    data: { invoices },
  } = useSelector<IState, IInvoicesState>((state) => state.invoices);

  const {
    data: { limitRevenuesMEI },
  } = useSelector<IState, IConfigState>((state) => state.config);

  useEffect(() => {
    const totalInvoicesEmitted = invoices
      .map((invoice) => invoice.valueUnmasked)
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);

    setRevenues(() => {
      return {
        available: Number(limitRevenuesMEI - totalInvoicesEmitted),
        used: Number(totalInvoicesEmitted),
        total: limitRevenuesMEI,
      };
    });
  }, [limitRevenuesMEI, invoices]);

  return (
    <PieChart
      title="Gráfico de Limites de Faturamento"
      labels={["Disponível", "Usado"]}
      colors={[theme.colors.success, theme.colors.danger]}
      series={[revenues.available, revenues.used]}
      isCurrencyValues={true}
    >
      <ContentDescriptionChartRevenues>
        <span>
          Valor Máximo Permitido:
          <b> {formatCurrency(limitRevenuesMEI / 100)}</b> (Configurado
          atualmente)
        </span>

        <span>
          Valor Máximo Permitido MEI:
          <b> {formatCurrency(limitRevenuesDefault / 100)}</b>
        </span>

        <span>
          Valor Utilizado até o momento:{" "}
          <b> {formatCurrency(revenues.used / 100)}</b>
        </span>
        <span>
          Valor Disponível até o momento:
          <b> {formatCurrency(revenues.available / 100)}</b>
        </span>
      </ContentDescriptionChartRevenues>
    </PieChart>
  );
};

export default ChartRevenuesLimits;
