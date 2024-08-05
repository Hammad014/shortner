// StatisticsComponent.tsx
import React from 'react';

interface StatisticsData {
  link: string;
  totalClicks: number;
  clicksPerDay: number;
  topReferrer: string;
  countries: string[];
}

interface StatisticsTableProps {
  statisticsData: StatisticsData[];
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ statisticsData }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-transparent border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Link</th>
            <th className="py-2 px-4 border-b">Total Clicks</th>
            <th className="py-2 px-4 border-b">Clicks Per Day</th>
            <th className="py-2 px-4 border-b">Top Referrer</th>
            <th className="py-2 px-4 border-b">Countries</th>
          </tr>
        </thead>
        <tbody>
          {statisticsData.map((item) => (
            <tr key={item.link}>
              <td className="py-2 px-4 border-b">{item.link}</td>
              <td className="py-2 px-4 border-b">{item.totalClicks}</td>
              <td className="py-2 px-4 border-b">{item.clicksPerDay}</td>
              <td className="py-2 px-4 border-b">{item.topReferrer}</td>
              <td className="py-2 px-4 border-b">{item.countries.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsTable;
