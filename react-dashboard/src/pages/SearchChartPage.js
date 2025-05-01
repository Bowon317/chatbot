import React from 'react';
import SearchChart from '../components/SearchChart';

const SearchChartPage = ({ data }) => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Popular Search Keywords Chart</h1>
      <SearchChart data={data} />
    </div>
  );
};

export default SearchChartPage;