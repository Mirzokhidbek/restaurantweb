import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Phone,
  Mail,
  User,
  HelpCircle,
  RotateCcw,
  Check,
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
          newStatus === 'resolved' ? 'Murojaat "Hal Qilindi" deb belgilandi!' : 'Murojaat "Kutilmoqda" holatiga o‘tkazildi',
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

  const getSubjectBadgeStyle = (subject) => {
    switch (subject) {
      case 'Buyurtma bo‘yicha':
        return 'bg-primary bg-opacity-10 text-primary border-primary border-opacity-30';
      case 'Yetkazib berish':
        return 'bg-warning bg-opacity-20 text-dark border-warning border-opacity-40';
      case 'To‘lov':
        return 'bg-info bg-opacity-10 text-info border-info border-opacity-30';
      case 'Sifat va Taklif':
        return 'bg-success bg-opacity-10 text-success border-success border-opacity-30';
      default:
        return 'bg-secondary bg-opacity-10 text-secondary border-secondary border-opacity-30';
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
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-extrabold text-dark font-heading mb-1 d-flex align-items-center gap-2">
            <MessageSquare className="text-warning" size={28} />
            <span>Mijozlar Murojaatlari</span>
          </h2>
          <p className="text-muted small mb-0">
            Mijozlar tomonidan yuborilgan barcha savollar va muammoli murojaatlar ro‘yxati.
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
              <div className="p-3 bg-warning bg-opacity-15 text-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <HelpCircle size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-4">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-3 border-start border-4 border-danger">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-bold">Kutilmoqda</span>
                <h3 className="fw-extrabold text-danger mb-0 font-heading">{pendingCount}</h3>
              </div>
              <div className="p-3 bg-danger bg-opacity-15 text-danger rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <Clock size={24} />
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
              <div className="p-3 bg-success bg-opacity-15 text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <CheckCircle2 size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar & Filter Buttons */}
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

      {/* Messages Data Table */}
      {loading ? (
        <Loading text="Murojaatlar yuklanmoqda..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : filteredMessages.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm bg-white p-5 text-center">
          <MessageSquare size={48} className="text-muted opacity-50 mb-3 mx-auto" />
          <h5 className="fw-bold text-dark mb-1">Hech qanday murojaat topilmadi</h5>
          <p className="text-muted small mb-0">Tanlangan Filtr bo‘yicha murojaatlar mavjud emas.</p>
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
                  const dateObj = new Date(msg.createdAt);
                  const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}.${String(
                    dateObj.getMonth() + 1
                  ).padStart(2, '0')}.${dateObj.getFullYear()}, ${String(
                    dateObj.getHours()
                  ).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;

                  const isResolved = msg.status === 'resolved';

                  return (
                    <tr key={msg._id}>
                      {/* Customer Info */}
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-warning bg-opacity-15 text-dark p-2 rounded-circle fw-bold d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <User size={20} />
                          </div>
                          <div>
                            <div className="fw-extrabold text-dark">{msg.senderName}</div>
                            <div className="small text-muted d-flex align-items-center gap-1">
                              <Phone size={12} className="text-muted" /> {msg.senderPhone}
                            </div>
                            {msg.senderEmail && (
                              <div className="small text-muted d-flex align-items-center gap-1">
                                <Mail size={12} className="text-muted" /> {msg.senderEmail}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Problem Category / Subject */}
                      <td>
                        <span className={`badge border px-3 py-2 rounded-pill fw-bold ${getSubjectBadgeStyle(msg.subject)}`}>
                          {msg.subject}
                        </span>
                      </td>

                      {/* Message Text */}
                      <td>
                        <div
                          className="text-dark small fw-medium text-wrap"
                          style={{ maxWidth: '340px', lineHeight: '1.5' }}
                        >
                          {msg.messageText}
                        </div>
                      </td>

                      {/* Clean Timestamp */}
                      <td className="small text-secondary fw-semibold">{formattedDate}</td>

                      {/* Explicit Readable Status Badge */}
                      <td>
                        {isResolved ? (
                          <span className="badge bg-success bg-opacity-15 text-success border border-success border-opacity-30 px-3 py-2 rounded-pill fw-extrabold d-inline-flex align-items-center gap-1">
                            <CheckCircle2 size={15} />
                            <span>Hal Qilindi</span>
                          </span>
                        ) : (
                          <span className="badge bg-danger bg-opacity-15 text-danger border border-danger border-opacity-30 px-3 py-2 rounded-pill fw-extrabold d-inline-flex align-items-center gap-1">
                            <Clock size={15} />
                            <span>Kutilmoqda</span>
                          </span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="pe-4 text-end">
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <button
                            className={`btn btn-sm ${
                              isResolved
                                ? 'btn-outline-secondary'
                                : 'btn-success text-white fw-bold shadow-sm'
                            } rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1`}
                            title={
                              isResolved
                                ? 'Kutilayotgan holatga qaytarish'
                                : 'Murojaatni hal qilindi deb belgilash'
                            }
                            onClick={() => handleToggleStatus(msg._id, msg.status)}
                          >
                            {isResolved ? (
                              <>
                                <RotateCcw size={14} />
                                <span>Qaytarish</span>
                              </>
                            ) : (
                              <>
                                <Check size={14} />
                                <span>Hal Qilindi</span>
                              </>
                            )}
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger rounded-circle p-2"
                            title="Murojaatni o‘chirish"
                            onClick={() => handleDelete(msg._id)}
                          >
                            <Trash2 size={15} />
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
    </div>
  );
};

export default AdminMessages;
