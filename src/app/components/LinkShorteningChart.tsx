'use client'
// LinkShorteningChart.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

interface LinkShorteningData {
  date: string; // You might need to adjust this based on the actual type of your date
  clicks: number;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartDataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
}

const LinkShorteningChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get<LinkShorteningData[]>('http://localhost:5000/api/link/shorteningChartData');
        
        const linkShorteningData = response.data;
        console.log('Link Shortening Data:', response.data);
        // Assuming the response data is an array of objects with 'date' and 'clicks' properties
        const dates = linkShorteningData.map(data => data.date);
        const clicks = linkShorteningData.map(data => data.clicks);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Link Shortening Clicks Over Time',
              data: clicks,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching link shortening data for the graph:', error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <>
    <div className='text-white'>
      <h2>Link Shortening Clicks Over Time</h2>
      <Line data={chartData} />
    </div>
    </>
  );
};

export default LinkShorteningChart;
