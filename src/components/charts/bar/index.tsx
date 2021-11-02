import React, { useContext } from "react";

import { ApexOptions } from "apexcharts";
import { ThemeContext } from "styled-components";
import { Container } from "../styles/styles";

import Chart from "react-apexcharts";

export type BarChartProps = {
  categories: string[];
  categorieType: "category" | "datetime" | "numeric" | undefined;
  series: { name: string; data: number[] }[];
  formatter?: (value: number) => string;
  title?: string;
  enableDataLabels?: boolean;
  barColors?: { colors: string[] };
};

const BarChart: React.FC<BarChartProps> = ({
  categories,
  series,
  formatter = () => "",
  children,
  title,
  enableDataLabels = true,
  barColors = {},
}) => {
  const { colors } = useContext(ThemeContext);

  const options: ApexOptions = {
    legend: { markers: { fillColors: [...(barColors.colors ?? "")] } },

    plotOptions: {
      bar: {
        // columnWidth: "10",
      },
    },
    chart: {
      height: 200,

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
      formatter: function (value) {
        if (!Number(value)) return "";

        return formatter(value as number);
      },
      enabled: enableDataLabels,
    },
    tooltip: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return formatter(value as number);
        },
      },
    },
    xaxis: {
      categories,
      type: "category",
      axisBorder: {
        show: false,
        color: colors.success,
      },
      axisTicks: { show: false },
    },

    fill: {
      opacity: 0.6,
      ...barColors,
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
      <h4>{title}</h4>
      {children}
      <Chart options={options} type={"bar"} series={series} />
    </Container>
  );
};

export { BarChart };
