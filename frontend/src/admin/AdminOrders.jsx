import React, { useState, useEffect } from 'react';
import { Eye, Clock, CheckCircle2, ChevronDown, Trash2, MapPin, Phone, FileText } from 'lucide-react';
import orderService from '../services/orderService';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { formatCurrency } from '../utils/formatCurrency';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const allowedStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];

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

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getOrders();
      if (res.success && res.data) {
        setOrders(res.data);
      }
    } catch (err) {
      setError(err.message || 'Buyurtmalarni yuklashda xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      fetchOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      setError(err.message || 'Buyurtma holatini o‘zgartirishda xatolik.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Haqiqatan ham ushbu buyurtma yozuvini o‘chirmoqchimisiz?')) return;
    try {
      await orderService.deleteOrder(orderId);
      setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      setError(err.message || 'Buyurtmani o‘chirishda xatolik.');
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

  return (
    <div className="admin-orders-page">
      <div className="mb-4">
        <h2 className="fw-extrabold text-dark mb-1">Buyurtmalar Boshqaruvi</h2>
        <p className="text-secondary">Mijozlar buyurtmalarini kuzating, yetkazish bosqichlarini yangilang va tafsilotlarni ko‘ring.</p>
      </div>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Loading text="Buyurtmalar ro‘yxati yuklanmoqda..." />
      ) : (
        <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
          <div className="table-responsive">
            <table className="table align-middle mb-0 table-hover">
              <thead className="table-light">
                <tr>
                  <th>Buyurtma ID</th>
                  <th>Mijoz</th>
                  <th>Telefon</th>
                  <th>Jami Summa</th>
                  <th>Joriy Holati</th>
                  <th>Sana</th>
                  <th className="text-end">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      Hozircha hech qanday buyurtma kiritilmagan.
                    </td>
                  </tr>
                ) : (
                  orders.map((ord) => (
                    <tr key={ord._id}>
                      <td className="font-monospace fw-bold small">#{ord._id.slice(-6)}</td>
                      <td>
                        <div className="fw-bold text-dark">{ord.customerName}</div>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: '180px' }}>
                          {ord.shippingAddress?.street || ord.address}
                        </small>
                      </td>
                      <td className="text-secondary small">{ord.phone}</td>
                      <td className="fw-extrabold text-primary">{formatCurrency(ord.totalPrice)}</td>
                      <td>
                        <div className="dropdown">
                          <button
                            className={`btn btn-sm dropdown-toggle rounded-pill px-3 fw-bold ${getStatusBadgeClass(
                              ord.status
                            )}`}
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {getStatusLabel(ord.status)}
                          </button>
                          <ul className="dropdown-menu shadow border-0 rounded-3">
                            {allowedStatuses.map((st) => (
                              <li key={st}>
                                <button
                                  className={`dropdown-item ${
                                    ord.status === st ? 'active fw-bold' : ''
                                  }`}
                                  onClick={() => handleStatusChange(ord._id, st)}
                                >
                                  {getStatusLabel(st)}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                      <td className="text-muted small">
                        {new Date(ord.createdAt).toLocaleString()}
                      </td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="btn btn-outline-primary btn-sm rounded-circle p-2"
                            title="Tafsilotlarni Ko‘rish"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(ord._id)}
                            className="btn btn-outline-danger btn-sm rounded-circle p-2"
                            title="O‘chirish"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal fade show d-block modal-backdrop-custom" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 p-4">
              <div className="modal-header border-0 pb-0">
                <h4 className="fw-bold text-dark">
                  Buyurtma Tafsilotlari <span className="font-monospace text-primary">#{selectedOrder._id}</span>
                </h4>
                <button className="btn-close" onClick={() => setSelectedOrder(null)}></button>
              </div>

              <div className="modal-body py-4">
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded-4">
                      <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                        <Phone size={16} className="text-warning" /> Mijoz Aloqasi
                      </h6>
                      <p className="fw-bold mb-1 text-dark">{selectedOrder.customerName}</p>
                      <small className="text-muted d-block">{selectedOrder.phone}</small>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded-4">
                      <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                        <MapPin size={16} className="text-warning" /> Yetkazib Berish Manzili
                      </h6>
                      <small className="text-dark d-block">
                        {selectedOrder.shippingAddress?.street || selectedOrder.address}
                      </small>
                      {selectedOrder.notes && (
                        <small className="text-muted italic d-block mt-1">
                          Izoh: "{selectedOrder.notes}"
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <h6 className="fw-bold text-dark mb-3">Buyurtma Qilingan Taomlar ({selectedOrder.items.length})</h6>
                <div className="table-responsive border rounded-4 mb-4">
                  <table className="table mb-0 align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Taom</th>
                        <th>Narxi</th>
                        <th>Soni</th>
                        <th className="text-end">Jami Summa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, i) => (
                        <tr key={i}>
                          <td className="fw-bold text-dark">{item.name}</td>
                          <td>{formatCurrency(item.price)}</td>
                          <td>{item.quantity}</td>
                          <td className="text-end fw-bold">{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-4">
                  <div>
                    <span className="text-muted small d-block">Holati</span>
                    <span className={`badge rounded-pill px-3 py-2 ${getStatusBadgeClass(selectedOrder.status)}`}>
                      {getStatusLabel(selectedOrder.status)}
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="text-muted small d-block">Jami Summa</span>
                    <span className="fs-3 fw-extrabold text-primary">
                      {formatCurrency(selectedOrder.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0 pt-0">
                <button className="btn btn-light rounded-pill px-4" onClick={() => setSelectedOrder(null)}>
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
