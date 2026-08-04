import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const TopNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <header className="top-navbar bg-white border-bottom px-4 py-3">
      <div className="d-flex justify-content-between align-items-center">

        {/* Left Side */}
        <div className="d-flex align-items-center">

          {/* Mobile Menu Button */}
          <button
            className="btn btn-light d-md-none me-3"
            onClick={toggleSidebar}
          >
            <FaBars size={20} />
          </button>

          {/* Title */}
          <div>
            <h4 className="mb-0 fw-bold text-uni-blue">
              Student Library Management System
            </h4>

            <small className="text-muted">
              Library Administration Dashboard
            </small>
          </div>

        </div>

        {/* Right Side */}
        <div className="ms-auto">

          {/* User Dropdown */}
          <div className="dropdown">

            <button
              className="btn btn-light border shadow-sm px-3 py-2 dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
            >

              <FaUserCircle
                size={28}
                className="text-secondary"
              />

              <div className="text-start d-none d-md-block">

                <div
                  className="fw-semibold"
                  style={{ lineHeight: "1" }}
                >
                  Administrator
                </div>

                <small className="text-muted">
                  System Admin
                </small>

              </div>

            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow">

              <li>

                <button
                  className="dropdown-item text-danger d-flex align-items-center gap-2"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  Logout
                </button>

              </li>

            </ul>

          </div>

        </div>

      </div>
    </header>
  );
};

export default TopNavbar;