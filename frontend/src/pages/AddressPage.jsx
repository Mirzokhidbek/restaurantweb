import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import ErrorMessage from '../components/ErrorMessage';
import { MapPin, Plus, Trash2 } from 'lucide-react';

const AddressPage = () => {
  const { adminUser } = useAuth();
  const [addresses, setAddresses] = useState(adminUser?.addresses || []);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: 'Uy', street: '', city: 'Namangan', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await authService.addAddress(formData);
      if (res.success && res.data) {
        setAddresses(res.data);
        setShowForm(false);
        setFormData({ title: 'Uy', street: '', city: 'Namangan', phone: '' });
      }
    } catch (err) {
      setError(err.message || 'Manzilni saqlashda xatolik.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAddress = async (id) => {
    try {
      const res = await authService.removeAddress(id);
      if (res.success && res.data) {
        setAddresses(res.data);
      }
    } catch (err) {
      setError(err.message || 'Manzilni o‘chirishda xatolik.');
    }
  };

  return (
    <div className="address-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
          <div>
            <h1 className="fw-extrabold text-dark mb-1">Saqlangan Yetkazish Manzillari</h1>
            <p className="text-secondary">Tezkor buyurtma berish uchun yetkazib berish manzillaringizni boshqaring.</p>
          </div>

          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary-custom px-4 py-2 d-inline-flex align-items-center gap-2">
            <Plus size={18} />
            <span>Yangi Manzil Qo‘shish</span>
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        {showForm && (
          <div className="card border-0 rounded-4 shadow-sm bg-white p-4 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            <h5 className="fw-bold text-dark mb-3">Yangi Manzil Qo‘shish</h5>
            <form onSubmit={handleAddAddress}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Manzil Turi</label>
                  <select
                    className="form-select rounded-3"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  >
                    <option value="Uy">Uy</option>
                    <option value="Offis">Offis</option>
                    <option value="Boshqa">Boshqa</option>
                  </select>
                </div>
                <div className="col-md-8">
                  <label className="form-label fw-semibold">Ko‘cha va Uy Manzili</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    required
                    placeholder="Masalan: Islom Karimov ko‘chasi, 25-uy"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Shahar / Tuman</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Namangan"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Telefon Raqam</label>
                  <input
                    type="tel"
                    className="form-control rounded-3"
                    placeholder="+998 90 123 45 67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="col-12 text-end pt-2">
                  <button type="button" className="btn btn-light rounded-pill me-2 px-4" onClick={() => setShowForm(false)}>
                    Bekor Qilish
                  </button>
                  <button type="submit" disabled={loading} className="btn btn-primary-custom rounded-pill px-4">
                    Manzilni Saqlash
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="row g-4">
          {addresses.length === 0 ? (
            <div className="col-12">
              <div className="card border-0 rounded-4 shadow-sm bg-white p-5 text-center">
                <MapPin size={40} className="text-warning mx-auto mb-3" />
                <h5 className="fw-bold text-dark">Saqlangan Manzillar Yo‘q</h5>
                <p className="text-muted">Yetkazib berish manzilini saqlash uchun 'Yangi Manzil Qo‘shish' tugmasini bosing.</p>
              </div>
            </div>
          ) : (
            addresses.map((addr) => (
              <div key={addr._id} className="col-12 col-md-6">
                <div className="card border-0 rounded-4 shadow-sm bg-white p-4 d-flex flex-row align-items-start justify-content-between">
                  <div className="d-flex align-items-start gap-3">
                    <div className="p-3 bg-warning bg-opacity-10 text-warning rounded-circle">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <span className="badge bg-dark text-white rounded-pill px-3 py-1 mb-2 fw-semibold">
                        {addr.title}
                      </span>
                      <h6 className="fw-bold text-dark mb-1">{addr.street}</h6>
                      <small className="text-muted d-block">{addr.city}</small>
                      {addr.phone && <small className="text-secondary d-block mt-1">Tel: {addr.phone}</small>}
                    </div>
                  </div>

                  <button onClick={() => handleRemoveAddress(addr._id)} className="btn btn-link text-danger p-0" title="Manzilni o‘chirish">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
