import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchSearchHistory } from "./services/api";
import Header from "./components/Header";   // ถูกต้องแล้ว
import Footer from "./components/Footer";   // ถูกต้องแล้ว
import Home from "./pages/Home";       // *** แก้ไข: "./pages/Home" ***
import SearchTablePage from "./pages/SearchTablePage"; // *** แก้ไข: "./pages/SearchTablePage" ***
import SearchChartPage from "./pages/SearchChartPage"; // *** แก้ไข: "./pages/SearchChartPage" ***
import ReviewPage from "./pages/ReviewPage";    // *** แก้ไข: "./pages/ReviewPage" ***
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [searchData, setSearchData] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSearchHistory();
      setSearchData(data);
    };

    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadReviews = async () => {
      // const reviewData = await fetchReviews();
      // setReviews(reviewData);
      const mockReviews = [
        { review_id: 1, line_user_id: "U123", review_text: "Great service!", created_at: "2024-01-01" },
        { review_id: 2, line_user_id: "U456", review_text: "Very helpful.", created_at: "2024-01-02" },
      ];
      setReviews(mockReviews);
    };

    loadReviews();
  }, []);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />  
        <main className="flex-grow-1">     
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/search-table" element={<SearchTablePage data={searchData} />} />
          <Route path="/search-chart" element={<SearchChartPage data={searchData} />} />
          <Route path="/review-table" element={<ReviewPage reviews={reviews} />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
