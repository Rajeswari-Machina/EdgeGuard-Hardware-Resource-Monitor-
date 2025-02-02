import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Chart, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
Chart.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stats");
        if (response.status === 200) {
          setStats(prevStats => [...prevStats, response.data]);
        } else {
          console.error("Failed to fetch stats:", response.status);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const intervalId = setInterval(fetchStats, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stats.map((_, i) => i),
        datasets: [{
          label: "CPU Usage (%)",
          data: stats.map(s => s.cpu),
          borderColor: "red",
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current.destroy();
    };
  }, [stats]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">EdgeGuard Dashboard</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Dashboard;
