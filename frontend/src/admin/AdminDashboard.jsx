import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  DollarSign,
  Clock,
  UtensilsCrossed,
  Users,
  TrendingUp,
  ArrowRight,
  Eye,
} from 'lucide-react';
import orderService from '../services/orderService';
import productService from '../services/productService';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { formatCurrency } from '../utils/formatCurrency';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    todaysOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    totalCustomers: 0,
  });
  const [totalProducts, setTotalProducts] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, productsRes, ordersRes] = await Promise.all([
          orderService.getDashboardStats(),
          productService.getProducts(),
          orderService.getOrders(),
        ]);

        if (statsRes.success && statsRes.data) {
          setStats(statsRes.data);
        }

        if (productsRes.success && productsRes.data) {
          setTotalProducts(productsRes.data.length);
        }

        if (ordersRes.success && ordersRes.data) {
          setRecentOrders(ordersRes.data.slice(0, 5));
        }
      } catch (err) {
        setError(err.message || 'Statistikani yuklashda xatolik yuz berdi.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Kutilmoqda';
      case 'confirmed': return 'Tasdiqlandi';
      case 'preparing': return 'Tayyorlanmoqda';
      case 'ready': return 'Yetkazishga Tayyor';
      case 'completed': return 'Bajarildi';
      case 'cancelled': return 'Bekor Qilindi';
      default: return status;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning text-dark';
      case 'confirmed': return 'bg-info text-white';
      case 'preparing': return 'bg-primary text-white';
      case 'ready': return 'bg-success text-white';
      case 'completed': return 'bg-secondary text-white';
      case 'cancelled': return 'bg-danger text-white';
      default: return 'bg-light text-dark';
    }
  };

  if (loading) return <Loading text="Jonli statistikalar yuklanmoqda..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="admin-dashboard">
      <div className="mb-4">
        <h2 className="fw-extrabold text-dark mb-1">Boshqaruv Paneli</h2>
        <p className="text-secondary">Real vaqtdagi savdo, buyurtmalar va mijozlar statistikasini kuzatib boring.</p>
      </div>

      {/* 6 Statistic Cards Grid */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted fw-semibold small">Umumiy Daromad</span>
              <div className="p-3 bg-success bg-opacity-10 text-success rounded-circle">
                <DollarSign size={24} />
              </div>
            </div>
            <h2 className="display-6 fw-extrabold text-dark mb-1">
              {formatCurrency(stats.totalRevenue)}
            </h2>
            <small className="text-success d-flex align-items-center gap-1">
              <TrendingUp size={14} /> Jami tushgan daromad
            </small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted fw-semibold small">Jami Buyurtmalar</span>
              <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle">
                <ShoppingBag size={24} />
              </div>
            </div>
            <h2 className="display-6 fw-extrabold text-dark mb-1">{stats.totalOrders}</h2>
            <small className="text-muted">Barcha tushgan buyurtmalar</small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted fw-semibold small">Bugungi Buyurtmalar</span>
              <div className="p-3 bg-warning bg-opacity-10 text-warning rounded-circle">
                <Clock size={24} />
              </div>
            </div>
            <h2 className="display-6 fw-extrabold text-dark mb-1">{stats.todaysOrders}</h2>
            <small className="text-warning fw-bold">Bugun tushgan buyurtmalar</small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted fw-semibold small">Kutilayotgan Buyurtmalar</span>
              <div className="p-3 bg-danger bg-opacity-10 text-danger rounded-circle">
                <Clock size={24} />
              </div>
            </div>
            <h2 className="display-6 fw-extrabold text-danger mb-1">{stats.pendingOrders}</h2>
            <small className="text-danger fw-semibold">Oshxona tasdig‘ini kutmoqda</small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted fw-semibold small">Jami Taomlar</span>
              <div className="p-3 bg-info bg-opacity-10 text-info rounded-circle">
                <UtensilsCrossed size={24} />
              </div>
            </div>
            <h2 className="display-6 fw-extrabold text-dark mb-1">{totalProducts}</h2>
            <small className="text-muted">Menyudagi taomlar soni</small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted fw-semibold small">Mijozlar Soni</span>
              <div className="p-3 bg-purple bg-opacity-10 text-dark rounded-circle">
                <Users size={24} />
              </div>
            </div>
            <h2 className="display-6 fw-extrabold text-dark mb-1">{stats.totalCustomers}</h2>
            <small className="text-muted">Ro‘yxatdan o‘tgan mijozlar</small>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h5 className="fw-bold text-dark mb-0">Oxirgi Buyurtmalar</h5>
          <Link to="/admin/orders" className="btn btn-outline-custom btn-sm rounded-pill d-flex align-items-center gap-1">
            <span>Barchasini Boshqarish</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-muted text-center py-4">Hozircha buyurtmalar yo‘q.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Mijoz</th>
                  <th>Telefon</th>
                  <th>Taomlar</th>
                  <th>Jami Summa</th>
                  <th>Holati</th>
                  <th>Sana</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="font-monospace fw-bold small text-truncate" style={{ maxWidth: '110px' }}>
                      #{order._id.slice(-6)}
                    </td>
                    <td className="fw-semibold text-dark">{order.customerName}</td>
                    <td className="text-secondary small">{order.phone}</td>
                    <td>{order.items.length} ta taom</td>
                    <td className="fw-extrabold text-primary">{formatCurrency(order.totalPrice)}</td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-2 ${getStatusBadgeClass(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="text-muted small">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
