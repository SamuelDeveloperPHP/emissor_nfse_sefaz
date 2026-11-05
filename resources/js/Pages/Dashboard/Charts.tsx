import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import type { Context } from "chartjs-plugin-datalabels";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar, Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export type Status = "autorizada" | "pendente" | "rejeitada" | "cancelada";

export const STATUS_META: { key: Status; label: string; color: string; ink: string }[] = [
  { key: "autorizada", label: "Autorizadas", color: "#1f8a5b", ink: "#ffffff" },
  { key: "pendente", label: "Pendentes", color: "#e0a526", ink: "#2b2100" },
  { key: "rejeitada", label: "Rejeitadas", color: "#c8452f", ink: "#ffffff" },
  { key: "cancelada", label: "Canceladas", color: "#6b778c", ink: "#ffffff" },
];

const formatInt = (value: number) => new Intl.NumberFormat("pt-BR").format(value);

type Theme = { text: string; muted: string; grid: string; surface: string; font: string };

const readTheme = (): Theme => {
  const css = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;

  return {
    text: read("--vz-body-color", "#495057"),
    muted: read("--vz-secondary-color", "#878a99"),
    grid: read("--vz-border-color", "#e9ebec"),
    surface: read("--vz-card-bg", "#ffffff"),
    font: getComputedStyle(document.body).fontFamily,
  };
};

// Chart.js paints to a canvas, so it cannot follow CSS variables on its own:
// re-read them whenever the light/dark mode changes.
const useChartTheme = (): Theme => {
  const mode = useSelector((state: any) => state.Layout.layoutModeType);
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setTheme(readTheme()));
    return () => cancelAnimationFrame(frame);
  }, [mode]);

  return theme;
};

type NotasChartProps = {
  labels: string[];
  serie: Record<Status, number[]>;
};

export const NotasChart = ({ labels, serie }: NotasChartProps) => {
  const theme = useChartTheme();

  const data = {
    labels,
    datasets: STATUS_META.map((status) => ({
      label: status.label,
      data: serie[status.key],
      backgroundColor: status.color,
      borderRadius: 2,
      maxBarThickness: 44,
      datalabels: { color: status.ink },
    })),
  };

  return (
    <Bar
      data={data}
      plugins={[ChartDataLabels]}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        font: { family: theme.font },
        interaction: { mode: "index", intersect: false },
        scales: {
          x: { stacked: true, grid: { display: false }, ticks: { color: theme.muted }, border: { color: theme.grid } },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: { color: theme.grid },
            border: { display: false },
            ticks: { color: theme.muted, precision: 0 },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: theme.text, usePointStyle: true, pointStyle: "rect", boxWidth: 8, padding: 16 },
          },
          tooltip: {
            callbacks: {
              label: (item) => ` ${item.dataset.label}: ${formatInt(Number(item.raw))}`,
              footer: (items) => `Total: ${formatInt(items.reduce((sum, item) => sum + Number(item.raw), 0))}`,
            },
          },
          datalabels: {
            font: { weight: 600, size: 11 },
            formatter: (value: number) => formatInt(value),
            // Skip segments too short to hold their number.
            display: (context: Context) => {
              const value = Number(context.dataset.data[context.dataIndex]);
              const scale = context.chart.scales.y;
              return value > 0 && scale.getPixelForValue(0) - scale.getPixelForValue(value) >= 16;
            },
          },
        },
      }}
    />
  );
};

type DonutProps = {
  items: { label: string; value: number; color: string; ink: string }[];
  valueSuffix: string;
};

const Donut = ({ items, valueSuffix }: DonutProps) => {
  const theme = useChartTheme();
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <Doughnut
      data={{
        labels: items.map((item) => item.label),
        datasets: [
          {
            data: items.map((item) => item.value),
            backgroundColor: items.map((item) => item.color),
            borderColor: theme.surface,
            borderWidth: 2,
            datalabels: { color: items.map((item) => item.ink) },
          },
        ],
      }}
      plugins={[ChartDataLabels]}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        cutout: "56%",
        font: { family: theme.font },
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: theme.text, usePointStyle: true, boxWidth: 8, padding: 16 },
          },
          tooltip: {
            callbacks: {
              label: (item) => {
                const value = Number(item.raw);
                const share = total > 0 ? ((value / total) * 100).toFixed(1).replace(".", ",") : "0";
                return ` ${item.label}: ${formatInt(value)} ${valueSuffix} (${share}%)`;
              },
            },
          },
          datalabels: {
            font: { weight: 600, size: 12 },
            formatter: (value: number) => formatInt(value),
            display: (context: Context) => {
              const value = Number(context.dataset.data[context.dataIndex]);
              return total > 0 && value / total >= 0.05;
            },
          },
        },
      }}
    />
  );
};

export const StatusDonut = ({ porStatus }: { porStatus: Record<Status, number> }) => (
  <Donut
    valueSuffix="notas"
    items={STATUS_META.map((status) => ({
      label: status.label,
      value: porStatus[status.key],
      color: status.color,
      ink: status.ink,
    }))}
  />
);

export const EmitentesDonut = ({ ativos, inativos }: { ativos: number; inativos: number }) => (
  <Donut
    valueSuffix="emitentes"
    items={[
      { label: "Ativos", value: ativos, color: "#405189", ink: "#ffffff" },
      { label: "Inativos", value: inativos, color: "#b4bccb", ink: "#1f2937" },
    ]}
  />
);
