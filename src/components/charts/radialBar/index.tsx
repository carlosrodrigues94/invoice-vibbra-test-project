import React, { useContext } from "react";

import { ApexOptions } from "apexcharts";
import { ThemeContext } from "styled-components";
import { Container } from "../styles/styles";

import Chart from "react-apexcharts";

export type RadialBarChartProps = {
  categories: string[];
  categorieType: "category" | "datetime" | "numeric" | undefined;
  series: number[];
  labels: string[];
};

const RadialBarChart: React.FC<RadialBarChartProps> = ({
  categories,
  series,
  labels,
}) => {
  const { colors } = useContext(ThemeContext);

  const options: ApexOptions = {
    chart: {
      height: 330,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: colors.info,
    },
    grid: {
      show: true,
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
      axisBorder: {
        color: colors.success,
      },
      axisTicks: {
        color: colors.primary,
      },
      categories: categories,
    },
    fill: {
      opacity: 0.6,
      type: "solid",
      gradient: {
        shade: "dark",
        opacityFrom: 1,
        opacityTo: 1,
      },
    },
  };

  return (
    <Container>
      <Chart type="radialBar" options={options} series={series} />
    </Container>
  );
};

export { RadialBarChart };
