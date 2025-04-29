import axios from "axios";

const API_URL = "http://localhost:3000"; // ใส่ IP ถ้าใช้กับเครื่องอื่น

export const fetchSearchHistory = async () => {
  try {
    const res = await axios.get(`${API_URL}/search-history`);
    return res.data;
  } catch (err) {
    console.error("API fetch error:", err);
    return [];
  }
};
export const getReviews = async () => {
  const res = await fetch(`${API_URL}/api/reviews`);
  return res.json();
};