import React, { useEffect, useState } from "react";
import { fetchSearchHistory } from "./services/api";
import SearchTable from "./components/SearchTable";
import SearchChart from "./components/SearchChart";
import ReviewTable from './components/ReviewTable';

function App() {
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSearchHistory();
      setSearchData(data);
    };

    loadData();
    const interval = setInterval(loadData, 5000); // รีโหลดทุก 5 วิ
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">💡 LINE Chatbot - Search Dashboard</h1>
      <SearchChart data={searchData} />
      <SearchTable data={searchData} />
      <ReviewTable />
    </div>
  );
}

export default App;
