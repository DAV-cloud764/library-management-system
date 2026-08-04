import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Automatically close sidebar when screen becomes desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="d-flex min-vh-100 bg-light">

      {/* ================= Sidebar ================= */}

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* ================= Main Content ================= */}

      <div className="main-content d-flex flex-column flex-grow-1">

        <TopNavbar
          toggleSidebar={toggleSidebar}
        />

        <main className="flex-grow-1 p-4">

          <Outlet />

        </main>

        <Footer />

      </div>

      {/* ================= Mobile Overlay ================= */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay d-md-none"
          onClick={closeSidebar}
        />
      )}

    </div>
  );
};

export default Layout;