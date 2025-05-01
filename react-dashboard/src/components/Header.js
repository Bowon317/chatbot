import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">Dashboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">หน้าหลัก</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search-table">ตารางค้นหา</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search-chart">กราฟค้นหา</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/review-table">ตารางรีวิว</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;