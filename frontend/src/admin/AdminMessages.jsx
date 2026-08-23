import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Trash2,
  Phone,
  Mail,
  User,
  AlertCircle,
  Sparkles,
  Send,
} from 'lucide-react';
import messageService from '../services/messageService';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { useToast } from '../context/ToastContext';

const AdminMessages = () => {
  const { toast } = useToast();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await messageService.getMessages();
      if (res.success && res.data) {
        setMessages(res.data);
      }
    } catch (err) {
      setError(err.message || 'Murojaatlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleStatus = async (msgId, currentStatus) => {
    const newStatus = currentStatus === 'resolved' ? 'pending' : 'resolved';
    try {
      const res = await messageService.updateMessageStatus(msgId, { status: newStatus });
      if (res.success) {
        toast.success(
          newStatus === 'resolved' ? 'Murojaat hal qilindi deb belgilandi!' : 'Murojaat kutilayotgan holatga o‘tkazildi',
          'Status Yangilandi'
        );
        setMessages((prev) =>
          prev.map((m) => (m._id === msgId ? { ...m, status: newStatus } : m))
        );
      }
    } catch (err) {
      toast.error(err.message || 'Statusni yangilashda xatolik', 'Xatolik');
    }
  };

  const handleDelete = async (msgId) => {
    if (!window.confirm('Haqiqatan ham ushbu murojaatni o‘chirmoqchimisiz?')) return;
    try {
      const res = await messageService.deleteMessage(msgId);
      if (res.success) {
        toast.success('Murojaat muvaffaqiyatli o‘chirildi', 'O‘chirildi');
        setMessages((prev) => prev.filter((m) => m._id !== msgId));
      }
    } catch (err) {
      toast.error(err.message || 'O‘chirishda xatolik yuz berdi', 'Xatolik');
    }
  };

  const handleSaveReply = async (e) => {
    e.preventDefault();
    if (!selectedMessage) return;
    try {
      const res = await messageService.updateMessageStatus(selectedMessage._id, {
        status: 'resolved',
        adminReply: adminReplyText,
      });
      if (res.success) {
        toast.success('Mijozga javob muvaffaqiyatli saqlandi va status hal qilindi!', 'Javob Yuborildi');
        setMessages((prev) =>
          prev.map((m) =>
            m._id === selectedMessage._id
              ? { ...m, status: 'resolved', adminReply: adminReplyText }
              : m
          )
        );
        setSelectedMessage(null);
        setAdminReplyText('');
      }
    } catch (err) {
      toast.error(err.message || 'Javobni saqlashda xatolik', 'Xatolik');
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesStatus = filterStatus === 'all' || msg.status === filterStatus;
    const matchesSearch =
      msg.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.senderPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.messageText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalCount = messages.length;
  const pendingCount = messages.filter((m) => m.status === 'pending').length;
  const resolvedCount = messages.filter((m) => m.status === 'resolved').length;

  return (
    <div className="admin-messages-page animate-fade-in">
      {/* Page Title Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-extrabold text-dark font-heading mb-1 d-flex align-items-center gap-2">
            <MessageSquare className="text-warning" size={28} />
            <span>Mijozlar Murojaatlari & Chat</span>
          </h2>
          <p className="text-muted small mb-0">
            Mijozlardan kelgan barcha savollar, muammolar va murojaatlarni real-vaqtda boshqarish.
          </p>
        </div>
      </div>

      {/* Metrics Banner Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-4">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-3 border-start border-4 border-warning">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-bold">Jami Murojaatlar</span>
                <h3 className="fw-extrabold text-dark mb-0 font-heading">{totalCount}</h3>
              </div>
              <div className="p-3 bg-warning bg-opacity-15 text-warning rounded-circle">
                <MessageSquare size={22} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-3 border-start border-4 border-danger">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-bold">Kutilmoqda (Javobsiz)</span>
                <h3 className="fw-extrabold text-danger mb-0 font-heading">{pendingCount}</h3>
              </div>
              <div className="p-3 bg-danger bg-opacity-15 text-danger rounded-circle">
                <Clock size={22} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-3 border-start border-4 border-success">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-bold">Hal Qilindi</span>
                <h3 className="fw-extrabold text-success mb-0 font-heading">{resolvedCount}</h3>
              </div>
              <div className="p-3 bg-success bg-opacity-15 text-success rounded-circle">
                <CheckCircle2 size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card border-0 rounded-4 shadow-sm bg-white p-3 mb-4">
        <div className="row g-3 align-items-center justify-content-between">
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text border-0 bg-light">
                <Search size={18} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-0 bg-light shadow-none"
                placeholder="Mijoz ismi, tel, muammo matni bo‘yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex gap-2 justify-content-md-end overflow-x-auto">
            <button
              className={`btn btn-sm rounded-pill px-3 fw-bold ${filterStatus === 'all' ? 'btn-warning text-white' : 'btn-light text-muted'}`}
              onClick={() => setFilterStatus('all')}
            >
              Barchasi ({totalCount})
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 fw-bold ${filterStatus === 'pending' ? 'btn-danger text-white' : 'btn-light text-muted'}`}
              onClick={() => setFilterStatus('pending')}
            >
              Kutilmoqda ({pendingCount})
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 fw-bold ${filterStatus === 'resolved' ? 'btn-success text-white' : 'btn-light text-muted'}`}
              onClick={() => setFilterStatus('resolved')}
            >
              Hal Qilingan ({resolvedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Content Display */}
      {loading ? (
        <Loading text="Murojaatlar yuklanmoqda..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : filteredMessages.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm bg-white p-5 text-center">
          <MessageSquare size={48} className="text-muted opacity-50 mb-3 mx-auto" />
          <h5 className="fw-bold text-dark mb-1">Hech qanday murojaat topilmadi</h5>
          <p className="text-muted small mb-0">Hozirda tanlangan parametrlar bo‘yicha murojaatlar mavjud emas.</p>
        </div>
      ) : (
        <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light text-muted small fw-bold">
                <tr>
                  <th className="ps-4">Mijoz Ma'lumotlari</th>
                  <th>Muammo Turi</th>
                  <th>Murojaat Matni</th>
                  <th>Sana va Vaqt</th>
                  <th>Holati</th>
                  <th className="pe-4 text-end">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((msg) => {
                  const createdDate = new Date(msg.createdAt).toLocaleString('uz-UZ', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <tr key={msg._id}>
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div className="bg-warning bg-opacity-15 text-dark p-2 rounded-circle fw-bold">
                            <User size={18} />
                          </div>
                          <div>
                            <div className="fw-bold text-dark">{msg.senderName}</div>
                            <div className="small text-muted d-flex align-items-center gap-1">
                              <Phone size={12} /> {msg.senderPhone}
                            </div>
                            {msg.senderEmail && (
                              <div className="small text-muted d-flex align-items-center gap-1">
                                <Mail size={12} /> {msg.senderEmail}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge bg-secondary bg-opacity-10 text-dark border px-2 py-1 rounded-pill fw-bold">
                          {msg.subject}
                        </span>
                      </td>

                      <td>
                        <div
                          className="text-dark small fw-medium text-wrap"
                          style={{ maxWidth: '320px', lineHeight: '1.4' }}
                        >
                          {msg.messageText}
                        </div>
                        {msg.adminReply && (
                          <div className="mt-1 p-2 rounded-3 bg-light border-start border-3 border-warning small text-secondary">
                            <strong>Javobingiz:</strong> {msg.adminReply}
                          </div>
                        )}
                      </td>

                      <td className="small text-muted fw-medium">{createdDate}</td>

                      <td>
                        {msg.status === 'resolved' ? (
                          <span className="badge bg-success bg-opacity-15 text-success border border-success border-opacity-30 px-3 py-2 rounded-pill fw-bold d-inline-flex align-items-center gap-1">
                            <CheckCircle2 size={14} /> Hal Qilindi
                          </span>
                        ) : (
                          <span className="badge bg-danger bg-opacity-15 text-danger border border-danger border-opacity-30 px-3 py-2 rounded-pill fw-bold d-inline-flex align-items-center gap-1">
                            <Clock size={14} /> Kutilmoqda
                          </span>
                        )}
                      </td>

                      <td className="pe-4 text-end">
                        <div className="d-flex align-items-center justify-content-end gap-1">
                          <button
                            className={`btn btn-sm ${msg.status === 'resolved' ? 'btn-outline-secondary' : 'btn-success'} rounded-circle p-2`}
                            title={msg.status === 'resolved' ? 'Kutilayotgan holatga o‘tkazish' : 'Hal qilindi deb belgilash'}
                            onClick={() => handleToggleStatus(msg._id, msg.status)}
                          >
                            <CheckCircle2 size={16} />
                          </button>

                          <button
                            className="btn btn-sm btn-outline-warning text-dark rounded-circle p-2"
                            title="Javob qaytarish"
                            onClick={() => {
                              setSelectedMessage(msg);
                              setAdminReplyText(msg.adminReply || '');
                            }}
                          >
                            <Send size={16} />
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger rounded-circle p-2"
                            title="O‘chirish"
                            onClick={() => handleDelete(msg._id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {selectedMessage && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title fw-bold font-heading">
                  💬 {selectedMessage.senderName} ga Javob Qaytarish
                </h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedMessage(null)}
                ></button>
              </div>

              <form onSubmit={handleSaveReply}>
                <div className="modal-body p-4">
                  <div className="p-3 bg-light rounded-3 mb-3 border">
                    <div className="fw-bold text-muted small mb-1">Mijoz Xabari:</div>
                    <div className="text-dark font-monospace small">{selectedMessage.messageText}</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold text-dark small">Admin Javobi</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="4"
                      placeholder="Mijoz uchun javob matnini kiriting..."
                      required
                      value={adminReplyText}
                      onChange={(e) => setAdminReplyText(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer bg-light">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill px-4"
                    onClick={() => setSelectedMessage(null)}
                  >
                    Bekor Qilish
                  </button>
                  <button type="submit" className="btn btn-warning rounded-pill px-4 fw-bold text-white">
                    Javobni Saqlash va Hal Qilish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
