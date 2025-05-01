import React from "react";

const SearchTable = ({ data }) => {
  const latestSearches = data.slice(-10).reverse(); // 10 รายการล่าสุด

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center" style={{ color: '#000' }}>📋 คำค้นหาล่าสุด</h2> {/* สีเขียว LINE */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-success" style={{ backgroundColor: '#00c300', color: 'white' }}> {/* สีเขียว LINE */}
                <tr>
                  <th>ผู้ใช้ ID</th>
                  <th>คำค้นหา</th>
                  <th>เวลาค้นหา</th>
                </tr>
              </thead>
              <tbody>
                {latestSearches.length > 0 ? (
                  latestSearches.map((item) => (
                    <tr key={item.id}>
                      <td>{item.user_id}</td>
                      <td className="fw-bold">{item.keyword}</td>
                      <td>{new Date(item.created_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      ไม่มีข้อมูลคำค้นหา
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

export default SearchTable;