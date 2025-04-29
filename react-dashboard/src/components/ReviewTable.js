// src/components/ReviewTable.js
import React, { useEffect, useState } from 'react';
import { getReviews } from '../services/api';

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then(data => setReviews(data));
  }, []);

  return (
    <div>
      <h2>User Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>LINE User ID</th>
            <th>Review</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.review_id}>
              <td>{r.line_user_id}</td>
              <td>{r.review_text}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
