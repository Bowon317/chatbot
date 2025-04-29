import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const SearchChart = ({ data }) => {
  const chartData = data.reduce((acc, curr) => {
    const found = acc.find(item => item.keyword === curr.keyword);
    if (found) found.count += 1;
    else acc.push({ keyword: curr.keyword, count: 1 });
    return acc;
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">📊 กราฟคำค้นหายอดนิยม</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="keyword" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SearchChart;
