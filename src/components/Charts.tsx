import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Register necessary Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// TypeScript interfaces for the fetched data
interface HistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

const fetchHistoricalData = async (): Promise<HistoricalData> => {
  const response = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  return response.data;
};

const Charts: React.FC = () => {
  // Use React Query to fetch historical data
  const { data, isLoading, error } = useQuery<HistoricalData>({
    queryKey: ["historicalData"],
    queryFn: fetchHistoricalData,
  });

  if (isLoading) return <p className="text-center">Loading chart...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading chart data.</p>
    );

  if (!data) return null; // Add this check to ensure data is defined

  // Prepare data for the chart
  const dates = Object.keys(data.cases);
  const cases = Object.values(data.cases);
  const deaths = Object.values(data.deaths);
  const recovered = Object.values(data.recovered);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Cases",
        data: cases,
        borderColor: "rgba(59, 130, 246, 1)", // Blue
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Deaths",
        data: deaths,
        borderColor: "rgba(239, 68, 68, 1)", // Red
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Recovered",
        data: recovered,
        borderColor: "rgba(16, 185, 129, 1)", // Green
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "COVID-19 Cases Fluctuations",
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10, // Adjust to show fewer labels for better readability
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl mb-4 text-center font-semibold">
        COVID-19 Cases Fluctuations
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Charts;
