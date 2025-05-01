import React from 'react';
import SearchTable from '../components/SearchTable';

const SearchTablePage = ({ data }) => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Search Query Table</h1>
      <SearchTable data={data} />
    </div>
  );
};

export default SearchTablePage;