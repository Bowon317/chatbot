import React from 'react';
import ReviewTable from '../components/ReviewTable';

const ReviewPage = ({ reviews }) => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">User Reviews</h1>
      <ReviewTable reviews={reviews} />
    </div>
  );
};

export default ReviewPage;