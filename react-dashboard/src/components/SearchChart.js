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
    <div className="container mt-5">
      <h2 className="mb-4 text-center" style={{ color: '#000' }}>📊 กราฟคำค้นหายอดนิยม</h2> {/* สีเขียว LINE */}
      <div className="card shadow-sm p-3">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="keyword" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#00c300" /> {/* สีเขียว LINE */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SearchChart;