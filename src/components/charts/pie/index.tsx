import React, { useContext } from "react";

import { ApexOptions } from "apexcharts";
import { ThemeContext } from "styled-components";
import { Container } from "../styles/styles";
import Chart from "react-apexcharts";

export type PieChartProps = {
  categories?: string[];
  categorieType?: "category" | "datetime" | "numeric" | undefined;
  series?: number[];
  labels?: string[];
  isCurrencyValues?: boolean;
  colors?: string[];
  title: string;
};

const PieChart: React.FC<PieChartProps> = ({
  categories = ["teste1"],
  series = [50, 12, 12],
  labels = ["sad", "mad"],
  colors = ["#552", "#000", "#333"],
  title,
  children,
}) => {
  const theme = useContext(ThemeContext);

  const options: ApexOptions = {
    legend: { show: false, markers: { fillColors: colors } },

    plotOptions: {
      pie: {
        customScale: 0.8,
        offsetX: 10,
      },
    },

    chart: {
      foreColor: theme.colors.text,
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: false,
    },
    labels,
    xaxis: {
      type: "category",
      categories: categories,
    },
    fill: {
      opacity: 0.8,
      colors,
    },
  };

  return (
    <Container>
      <h4>{title}</h4>
      {children}
      <Chart type="pie" options={options} series={series} />
    </Container>
  );
};

export { PieChart };
