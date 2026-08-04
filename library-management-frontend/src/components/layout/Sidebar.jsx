import { NavLink } from "react-router-dom";
import {
  FaBookOpen,
  FaHome,
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import authService from "../../services/authService";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  const closeSidebar = () => {
    if (window.innerWidth < 768 && toggleSidebar) {
      toggleSidebar();
    }
  };

  return (
    <aside
      className={`sidebar bg-uni-blue text-white d-flex flex-column ${
        isOpen ? "show" : ""
      }`}
    >
      {/* =======================
            LOGO
      ======================== */}

      <div className="sidebar-header text-center py-4 border-bottom border-light border-opacity-25">
        <FaBookOpen size={42} className="mb-3 text-white" />

        <h5 className="fw-bold mb-1">
          Student Library
        </h5>

        <small className="text-white-50">
          Management System
        </small>
      </div>

      {/* =======================
            MENU
      ======================== */}

      <div className="flex-grow-1 px-3 py-4">

        <small className="text-uppercase text-white-50 fw-semibold ms-2">
          Main Menu
        </small>

        <ul className="nav flex-column mt-3">

          <li className="nav-item mb-2">
            <NavLink
              to="/dashboard"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <FaHome />
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/books"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <FaBook />
              Books
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/students"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <FaUsers />
              Students
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/borrow"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <FaExchangeAlt />
              Borrow Book
            </NavLink>
          </li>

        
        </ul>
      </div>

      {/* =======================
            FOOTER
      ======================== */}

      <div className="sidebar-footer border-top border-light border-opacity-25 p-3">

        <div className="mb-3">
          <small className="text-white-50">
            Logged in as
          </small>

          <div className="fw-semibold">
            Administrator
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;