import React, { useEffect, useState } from 'react';
import { getReviews } from '../services/api';

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then(data => setReviews(data));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center" style={{ color: '#0000' }}>⭐ รีวิวจากผู้ใช้</h2> {/* สีเขียว LINE */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle mb-0">
              <thead className="table-success" style={{ backgroundColor: '#00c300', color: 'white' }}> {/* สีเขียว LINE */}
                <tr>
                  <th scope="col" className="text-nowrap">LINE User ID</th>
                  <th scope="col">รีวิว</th>
                  <th scope="col" className="text-nowrap">วันที่</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length > 0 ? (
                  reviews.map((r) => (
                    <tr key={r.review_id}>
                      <td className="text-nowrap">{r.line_user_id}</td>
                      <td>{r.review_text}</td>
                      <td className="text-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      ยังไม่มีรีวิว
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTable;