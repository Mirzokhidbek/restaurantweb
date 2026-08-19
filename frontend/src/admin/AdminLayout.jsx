import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  ShoppingBag,
  Users,
  LogOut,
  ExternalLink,
  Menu as MenuIcon,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { adminUser, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-3 d-lg-none"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`bg-dark text-white p-3 d-flex flex-column justify-content-between position-fixed top-0 bottom-0 start-0 z-4 transition-all ${
          sidebarOpen ? 'd-flex' : 'd-none d-lg-flex'
        }`}
        style={{ width: '260px', zIndex: 1045 }}
      >
        <div>
          {/* Admin Header */}
          <div className="d-flex align-items-center justify-content-between pb-4 border-bottom border-secondary border-opacity-25 mb-4">
            <div className="d-flex align-items-center gap-2">
              <span className="bg-warning text-dark p-2 rounded-circle fw-bold">🍔</span>
              <div>
                <h6 className="fw-extrabold text-white mb-0 font-heading">SavoryBites</h6>
                <small className="text-warning small d-flex align-items-center gap-1">
                  <ShieldCheck size={12} /> Admin Portal
                </small>
              </div>
            </div>
            <button
              className="btn btn-sm btn-outline-secondary text-white border-0 d-lg-none"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="nav nav-pills flex-column gap-2 mb-auto">
            <li className="nav-item">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white ${
                    isActive ? 'bg-warning text-dark fw-bold' : 'hover-bg-secondary'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white ${
                    isActive ? 'bg-warning text-dark fw-bold' : 'hover-bg-secondary'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <UtensilsCrossed size={18} />
                <span>Products</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/categories"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white ${
                    isActive ? 'bg-warning text-dark fw-bold' : 'hover-bg-secondary'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Layers size={18} />
                <span>Categories</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white ${
                    isActive ? 'bg-warning text-dark fw-bold' : 'hover-bg-secondary'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <ShoppingBag size={18} />
                <span>Orders</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/customers"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white ${
                    isActive ? 'bg-warning text-dark fw-bold' : 'hover-bg-secondary'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Users size={18} />
                <span>Customers</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-top border-secondary border-opacity-25">
          <NavLink
            to="/"
            target="_blank"
            className="btn btn-outline-light btn-sm w-100 mb-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
          >
            <span>View Public Site</span>
            <ExternalLink size={14} />
          </NavLink>

          <div className="d-flex align-items-center justify-content-between pt-2">
            <div className="text-truncate me-2">
              <div className="fw-bold text-white small text-truncate">{adminUser?.name || 'Admin'}</div>
              <small className="text-secondary d-block text-truncate" style={{ fontSize: '0.72rem' }}>
                {adminUser?.email}
              </small>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-danger rounded-circle p-2"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow-1 ms-0 ms-lg-auto" style={{ marginLeft: '260px' }}>
        {/* Top Navbar */}
        <header className="bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between sticky-top z-2">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-light d-lg-none p-2 rounded-circle"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon size={20} />
            </button>
            <h5 className="fw-bold text-dark mb-0">Restaurant Admin Dashboard</h5>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2">
              🟢 System Online
            </span>
          </div>
        </header>

        <main className="p-4 p-md-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
