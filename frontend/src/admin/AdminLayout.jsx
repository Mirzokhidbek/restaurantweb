import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  ShoppingBag,
  Users,
  MessageSquare,
  LogOut,
  ExternalLink,
  Menu as MenuIcon,
  X,
  ShieldCheck,
  Power,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRestaurantStatus } from '../context/RestaurantStatusContext';
import { useToast } from '../context/ToastContext';

const AdminLayout = () => {
  const { adminUser, logout } = useAuth();
  const { isRestaurantOpen, toggleRestaurantStatus } = useRestaurantStatus();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toggling, setToggling] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleToggleRestaurant = async () => {
    setToggling(true);
    try {
      const res = await toggleRestaurantStatus();
      if (res && res.data) {
        if (res.data.isRestaurantOpen) {
          toast.success('Restoran faoliyati MUVAFFAQIYATLI OCHILDI! Buyurtmalar qabul qilinmoqda.', '🟢 Restoran Ochiq');
        } else {
          toast.warning('Restoran faoliyati VAQTINCHA YOPILDI! Buyurtmalar to‘xtatildi.', '🔴 Restoran Yopildi');
        }
      }
    } catch (err) {
      toast.error(err.message || 'Holatni o‘zgartirishda xatolik yuz berdi.', 'Xatolik');
    } finally {
      setToggling(false);
    }
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
        style={{
          width: '260px',
          zIndex: 1045,
          background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
          boxShadow: '4px 0 25px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div>
          {/* Admin Header */}
          <div className="d-flex align-items-center justify-content-between pb-4 border-bottom border-secondary border-opacity-25 mb-4 pt-2">
            <div className="d-flex align-items-center gap-2">
              <span className="bg-warning text-dark p-2 rounded-circle fw-bold shadow-sm">🌙</span>
              <div>
                <h6 className="fw-extrabold text-white mb-0 font-heading" style={{ fontSize: '1rem' }}>FAZO Namangan</h6>
                <small className="text-warning small d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
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
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white transition-all ${
                    isActive
                      ? 'bg-warning text-dark fw-extrabold shadow-sm'
                      : 'hover-bg-secondary opacity-75 hover-opacity-100'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <LayoutDashboard size={18} />
                <span>Boshqaruv Paneli</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white transition-all ${
                    isActive
                      ? 'bg-warning text-dark fw-extrabold shadow-sm'
                      : 'hover-bg-secondary opacity-75 hover-opacity-100'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <UtensilsCrossed size={18} />
                <span>Taomlar Menyusi</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/categories"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white transition-all ${
                    isActive
                      ? 'bg-warning text-dark fw-extrabold shadow-sm'
                      : 'hover-bg-secondary opacity-75 hover-opacity-100'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Layers size={18} />
                <span>Kategoriyalar</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white transition-all ${
                    isActive
                      ? 'bg-warning text-dark fw-extrabold shadow-sm'
                      : 'hover-bg-secondary opacity-75 hover-opacity-100'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <ShoppingBag size={18} />
                <span>Buyurtmalar</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/customers"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white transition-all ${
                    isActive
                      ? 'bg-warning text-dark fw-extrabold shadow-sm'
                      : 'hover-bg-secondary opacity-75 hover-opacity-100'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Users size={18} />
                <span>Mijozlar</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/messages"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white transition-all ${
                    isActive
                      ? 'bg-warning text-dark fw-extrabold shadow-sm'
                      : 'hover-bg-secondary opacity-75 hover-opacity-100'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <MessageSquare size={18} />
                <span>Xabarlar & Chat</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-top border-secondary border-opacity-25">
          <NavLink
            to="/"
            target="_blank"
            className="btn btn-outline-light btn-sm w-100 mb-3 rounded-pill d-flex align-items-center justify-content-center gap-2"
          >
            <span>Asosiy Saytga O‘tish</span>
            <ExternalLink size={14} />
          </NavLink>

          <div className="d-flex align-items-center justify-content-between pt-2">
            <div className="text-truncate me-2">
              <div className="fw-bold text-white small text-truncate">{adminUser?.name || 'Administrator'}</div>
              <small className="text-secondary d-block text-truncate" style={{ fontSize: '0.72rem' }}>
                {adminUser?.email}
              </small>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-danger rounded-circle p-2 shadow-sm"
              title="Chiqish"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-wrapper flex-grow-1">
        {/* Top Navbar */}
        <header className="bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between sticky-top shadow-sm z-2">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-light d-lg-none p-2 rounded-circle"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon size={20} />
            </button>
            <h5 className="fw-extrabold text-dark mb-0 font-heading">FAZO Restorani Admin Paneli</h5>
          </div>

          {/* 3D Status Toggle Switch Widget */}
          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted fw-bold d-none d-md-inline">Restoran Faoliyati:</span>
            <button
              onClick={handleToggleRestaurant}
              disabled={toggling}
              className={`status-toggle-widget border-0 rounded-pill px-3 py-2 d-flex align-items-center gap-2 ${
                isRestaurantOpen
                  ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-30'
                  : 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-30'
              }`}
              title="Restoran faoliyatini yoqish yoki o'chirish uchun bosing"
            >
              <span className={isRestaurantOpen ? 'status-pulse-green' : 'status-pulse-red'}></span>
              <span className="fw-extrabold fs-6">
                {isRestaurantOpen ? 'Ochiq' : 'Yopilgan'}
              </span>
              <span
                className={`badge rounded-circle p-1 ms-1 d-flex align-items-center justify-content-center text-white ${
                  isRestaurantOpen ? 'bg-success' : 'bg-danger'
                }`}
                style={{ width: '22px', height: '22px' }}
              >
                <Power size={12} />
              </span>
            </button>
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
