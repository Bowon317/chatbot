// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { fetchSearchHistory, getReviews } from '../services/api'; // นำเข้า API

const Home = () => {
  // State สำหรับเก็บข้อมูล
  const [searchCount, setSearchCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ดึงข้อมูลจาก API เมื่อหน้าโหลด
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [searchData, reviewData] = await Promise.all([
          fetchSearchHistory(),
          getReviews()
        ]);

        // นับจำนวนคำค้นหาทั้งหมด
        setSearchCount(searchData.length);

        // นับจำนวนผู้ใช้ที่แตกต่างกัน
        const uniqueUsers = new Set(searchData.map(item => item.user_id));
        setUserCount(uniqueUsers.size);

        // นับจำนวนรีวิวทั้งหมด
        setReviewCount(reviewData.length);

        // รวมกิจกรรมล่าสุด (คำค้นหา + รีวิว)
        const combined = [
          ...searchData.map(item => ({
            type: 'search',
            user: item.user_id,
            action: `ค้นหา "${item.keyword}"`,
            time: item.created_at
          })),
          ...reviewData.map(item => ({
            type: 'review',
            user: item.line_user_id,
            action: `ให้รีวิว "${item.review_text.slice(0, 20)}..."`,
            time: item.created_at
          }))
        ];

        // เรียงตามเวลาล่าสุด
        const sorted = combined.sort((a, b) => new Date(b.time) - new Date(a.time));
        setRecentActivity(sorted.slice(0, 5)); // เอาเฉพาะ 5 รายการล่าสุด
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลได้');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ฟังก์ชันแสดงสถานะโหลด
  if (loading) {
    return <div className="text-center my-5">กำลังโหลดข้อมูล...</div>;
  }

  // ฟังก์ชันแสดงข้อผิดพลาด
  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container-fluid px-0">
      {/* Hero Section */}
      <div className=" text-center py-5"style={{ backgroundColor: '#00c300', color: 'white' }}>
        <h1 className="display-4 fw-bold">ChatBotLine-OA</h1>
        <p className="lead">ระบบวิเคราะห์ข้อมูลผู้ใช้ LINE OA แบบเรียลไทม์</p>
        <hr className="my-4 bg-white" />
        <p>สร้างประสบการณ์การบริการที่ดีที่สุดด้วยข้อมูลเชิงลึก</p>
      </div>

      {/* Stats Section */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">สถิติสำคัญ</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-primary">
                <div className="card-body">
                  <h2 className="card-title text-primary">{searchCount}</h2>
                  <p className="card-text">คำค้นหาทั้งหมด</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-success">
                <div className="card-body">
                  <h2 className="card-title text-success">{userCount}</h2>
                  <p className="card-text">จำนวนผู้ใช้งาน</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-warning">
                <div className="card-body">
                  <h2 className="card-title text-warning">{reviewCount}</h2>
                  <p className="card-text">รีวิวทั้งหมด</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="container my-5">
        <h2 className="mb-4">กิจกรรมล่าสุด</h2>
        <div className="list-group">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <a
                key={index}
                href="#"
                className="list-group-item list-group-item-action"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{activity.user} {activity.action}</h5>
                  <small>{new Date(activity.time).toLocaleString()}</small>
                </div>
                <p className="mb-1">{activity.type === 'search' ? 'คำค้นหา' : 'รีวิว'}</p>
              </a>
            ))
          ) : (
            <p>ไม่มีกิจกรรมล่าสุด</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;