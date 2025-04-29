import React from "react";

const SearchTable = ({ data }) => (
  <div className="p-4">
    <h2 className="text-2xl mb-4">📋 คำค้นหาล่าสุด</h2>
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          <th className="border p-2">User ID</th>
          <th className="border p-2">Keyword</th>
          <th className="border p-2">เวลาค้นหา</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="border p-2">{item.user_id}</td>
            <td className="border p-2">{item.keyword}</td>
            <td className="border p-2">{item.created_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SearchTable;
