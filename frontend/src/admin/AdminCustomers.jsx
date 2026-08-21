import React, { useState, useEffect } from 'react';
import { Users, Phone, ShoppingBag, DollarSign, Calendar } from 'lucide-react';
import orderService from '../services/orderService';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { formatCurrency } from '../utils/formatCurrency';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerMetrics = async () => {
      try {
        setLoading(true);
        const res = await orderService.getOrders();
        if (res.success && res.data) {
          const orders = res.data;

          // Aggregate unique customer metrics by phone
          const customerMap = {};

          orders.forEach((ord) => {
            const key = ord.phone.trim();
            if (!customerMap[key]) {
              customerMap[key] = {
                phone: ord.phone,
                name: ord.customerName,
                address: ord.shippingAddress?.street || ord.address,
                orderCount: 0,
                totalSpent: 0,
                lastOrderDate: ord.createdAt,
              };
            }

            customerMap[key].orderCount += 1;
            if (ord.status !== 'cancelled') {
              customerMap[key].totalSpent += ord.totalPrice;
            }

            if (new Date(ord.createdAt) > new Date(customerMap[key].lastOrderDate)) {
              customerMap[key].lastOrderDate = ord.createdAt;
              customerMap[key].name = ord.customerName; // update latest name
            }
          });

          setCustomers(Object.values(customerMap));
        }
      } catch (err) {
        setError(err.message || 'Mijozlar ma’lumotlarini tahlil qilishda xatolik.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerMetrics();
  }, []);

  return (
    <div className="admin-customers-page">
      <div className="mb-4">
        <h2 className="fw-extrabold text-dark mb-1">Mijozlar Tahlili</h2>
        <p className="text-secondary">Har bir mijozning buyurtmalar tarixi va harid hajmini kuzatib boring.</p>
      </div>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Loading text="Mijozlar buyurtma tarixi tahlil qilinmoqda..." />
      ) : (
        <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
          <div className="table-responsive">
            <table className="table align-middle mb-0 table-hover">
              <thead className="table-light">
                <tr>
                  <th>Mijoz Ismi</th>
                  <th>Telefon Raqami</th>
                  <th>Jami Buyurtmalar</th>
                  <th>Jami Haridi</th>
                  <th>Oxirgi Buyurtma Sanasi</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      Hozircha mijozlar yozuvlari kiritilmagan.
                    </td>
                  </tr>
                ) : (
                  customers.map((cust, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="fw-bold text-dark">{cust.name}</div>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: '220px' }}>
                          {cust.address}
                        </small>
                      </td>
                      <td className="text-secondary font-monospace small">{cust.phone}</td>
                      <td>
                        <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                          {cust.orderCount} ta buyurtma
                        </span>
                      </td>
                      <td className="fw-extrabold text-success fs-6">
                        {formatCurrency(cust.totalSpent)}
                      </td>
                      <td className="text-muted small">
                        {new Date(cust.lastOrderDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
