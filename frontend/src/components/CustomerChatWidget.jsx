import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Headset,
  CheckCircle2,
  User,
  Phone,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Bot,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import aiService from '../services/aiService';
import messageService from '../services/messageService';

const CustomerChatWidget = () => {
  const { adminUser } = useAuth();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ai'); // 'ai' or 'human'
  const [aiLoading, setAiLoading] = useState(false);
  const [humanLoading, setHumanLoading] = useState(false);
  const [humanSentSuccess, setHumanSentSuccess] = useState(false);

  // AI Chat Messages Thread
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Salom! Men FAZO Restorani AI Afitsiantiman 🤖. Bugun sizga qanday taom tavsiya etay yoki qanday savolingiz bor?',
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Human Support Form Data
  const [formData, setFormData] = useState({
    senderName: adminUser?.name || '',
    senderPhone: adminUser?.phone || '',
    senderEmail: adminUser?.email || '',
    subject: 'Buyurtma bo‘yicha',
    messageText: '',
  });

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'ai') {
      scrollToBottom();
    }
  }, [chatMessages, isOpen, activeTab]);

  useEffect(() => {
    if (adminUser) {
      setFormData((prev) => ({
        ...prev,
        senderName: adminUser.name || prev.senderName,
        senderPhone: adminUser.phone || prev.senderPhone,
        senderEmail: adminUser.email || prev.senderEmail,
      }));
    }
  }, [adminUser]);

  // Send message to Gemini AI Afitsiant
  const handleSendAIMessage = async (textToSend) => {
    const messageText = (textToSend || inputMessage).trim();
    if (!messageText || aiLoading) return;

    const userMsgObj = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsgObj]);
    if (!textToSend) setInputMessage('');
    setAiLoading(true);

    try {
      const history = chatMessages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const res = await aiService.chatWithAI({
        message: messageText,
        history,
        senderName: adminUser?.name || 'Mijoz',
        senderPhone: adminUser?.phone || '',
      });

      if (res.success && res.data?.reply) {
        const aiMsgObj = {
          id: Date.now() + 1,
          sender: 'ai',
          text: res.data.reply,
          time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages((prev) => [...prev, aiMsgObj]);
      }
    } catch (err) {
      toast.error(err.message || 'AI bilan ulanishda xatolik yuz berdi', 'Xatolik');
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: 'Kechirasiz, vaqtincha tarmoq uzilishi yuz berdi. Qayta urinib ko‘ring.',
          time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // Submit Traditional Human Support Ticket
  const handleHumanSubmit = async (e) => {
    e.preventDefault();
    setHumanLoading(true);

    try {
      await messageService.sendMessage({
        ...formData,
        userId: adminUser?._id || null,
      });

      setHumanSentSuccess(true);
      toast.success(
        'Murojaatingiz qabul qilindi! Menejerimiz tez orada bog‘lanadi.',
        'Xabar Yuborildi'
      );

      setFormData((prev) => ({
        ...prev,
        messageText: '',
      }));

      setTimeout(() => {
        setHumanSentSuccess(false);
      }, 4500);
    } catch (err) {
      toast.error(err.message || 'Xabar yuborishda xatolik yuz berdi.', 'Xatolik');
    } finally {
      setHumanLoading(false);
    }
  };

  const quickPrompts = [
    '🍽️ Menga 2 kishilik taom set tavsiya et',
    '🔥 Eng mashhur shashlik va taomlar',
    '🛵 Yetkazib berish narxi va vaqti',
  ];

  return (
    <div className="customer-chat-widget position-fixed bottom-0 end-0 p-3 p-md-4" style={{ zIndex: 1050 }}>
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn rounded-pill px-4 py-3 shadow-lg fw-extrabold text-white d-flex align-items-center gap-3 border border-2 border-warning border-opacity-40 transition-transform hover-lift"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            boxShadow: '0 12px 35px rgba(15, 23, 42, 0.4), 0 0 20px rgba(245, 158, 11, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="position-relative d-flex align-items-center justify-content-center bg-warning text-dark p-2 rounded-circle shadow-sm" style={{ width: '38px', height: '38px' }}>
            <Bot size={22} className="text-dark" />
            <span
              className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-white rounded-circle shadow-sm"
              style={{ width: '11px', height: '11px' }}
            ></span>
          </div>

          <div className="d-flex flex-column text-start">
            <span className="text-white fw-extrabold fs-6 font-heading" style={{ letterSpacing: '0.3px' }}>
              FAZO AI Afitsiant
            </span>
            <small className="text-warning opacity-90 fw-semibold d-flex align-items-center gap-1" style={{ fontSize: '0.72rem' }}>
              <Sparkles size={12} /> Sun'iy Intellekt Onlayn
            </small>
          </div>
        </button>
      )}

      {/* Main Chat Window */}
      {isOpen && (
        <div
          className="card border-0 rounded-4 shadow-lg overflow-hidden bg-white animate-fade-in"
          style={{
            width: '395px',
            maxWidth: '94vw',
            height: '620px',
            maxHeight: '85vh',
            boxShadow: '0 25px 60px rgba(15, 23, 42, 0.35)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            className="p-3 px-4 text-white d-flex align-items-center justify-content-between border-bottom border-warning border-opacity-25"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
          >
            <div className="d-flex align-items-center gap-3">
              <div className="bg-warning text-dark p-2 rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                <Bot size={24} />
              </div>
              <div>
                <h6 className="fw-extrabold text-white mb-0 font-heading d-flex align-items-center gap-1.5" style={{ fontSize: '1rem' }}>
                  <span>FAZO AI Afitsiant</span>
                  <Sparkles size={14} className="text-warning" />
                </h6>
                <small className="text-warning small d-flex align-items-center gap-1.5" style={{ fontSize: '0.74rem' }}>
                  <span className="spinner-grow spinner-grow-sm text-warning" style={{ width: '7px', height: '7px' }}></span>
                  Google Gemini 2.0 AI Bilan
                </small>
              </div>
            </div>

            <button
              className="btn btn-sm btn-outline-light text-white-50 border-0 rounded-circle p-1.5 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="bg-light p-2 border-bottom d-flex gap-2 justify-content-center">
            <button
              className={`btn btn-sm rounded-pill px-3 py-1 fw-bold d-flex align-items-center gap-1.5 ${
                activeTab === 'ai' ? 'btn-warning text-white shadow-sm' : 'btn-light text-muted'
              }`}
              onClick={() => setActiveTab('ai')}
            >
              <Bot size={15} />
              <span>AI Afitsiant</span>
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 py-1 fw-bold d-flex align-items-center gap-1.5 ${
                activeTab === 'human' ? 'btn-warning text-white shadow-sm' : 'btn-light text-muted'
              }`}
              onClick={() => setActiveTab('human')}
            >
              <Headset size={15} />
              <span>Operatorga Xabar</span>
            </button>
          </div>

          {/* AI Chat Tab */}
          {activeTab === 'ai' && (
            <div className="d-flex flex-column flex-grow-1 overflow-hidden bg-light bg-opacity-30">
              {/* Message History Thread */}
              <div className="p-3 overflow-y-auto flex-grow-1 d-flex flex-column gap-3">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`d-flex flex-column ${
                      msg.sender === 'user' ? 'align-items-end' : 'align-items-start'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-4 shadow-sm text-wrap ${
                        msg.sender === 'user'
                          ? 'bg-warning text-dark font-semibold'
                          : 'bg-white text-dark border border-light-subtle'
                      }`}
                      style={{
                        maxWidth: '85%',
                        lineHeight: '1.5',
                        fontSize: '0.88rem',
                        whiteSpace: 'pre-line',
                        borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                        borderBottomLeftRadius: msg.sender === 'ai' ? '4px' : '16px',
                      }}
                    >
                      {msg.text}
                    </div>
                    <small className="text-muted mt-1 px-1" style={{ fontSize: '0.68rem' }}>
                      {msg.time}
                    </small>
                  </div>
                ))}

                {aiLoading && (
                  <div className="d-flex align-items-center gap-2 text-warning fw-bold p-2 bg-white rounded-3 shadow-sm border w-auto align-self-start small">
                    <RefreshCw size={14} className="animate-spin" />
                    <span>AI o‘ylamoqda va menyuni tahlil qilmoqda...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Prompts Chips */}
              <div className="p-2 px-3 bg-white border-top border-bottom overflow-x-auto d-flex gap-2 no-scrollbar">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    disabled={aiLoading}
                    onClick={() => handleSendAIMessage(prompt)}
                    className="btn btn-outline-warning btn-sm rounded-pill text-nowrap small text-dark fw-bold border-opacity-50 py-1"
                    style={{ fontSize: '0.74rem' }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendAIMessage();
                }}
                className="p-2 px-3 bg-white d-flex align-items-center gap-2"
              >
                <input
                  type="text"
                  className="form-control form-control-sm border-0 bg-light rounded-pill py-2 px-3 shadow-none text-dark small"
                  placeholder="AI Afitsiantga savolingizni yozing..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={aiLoading}
                />
                <button
                  type="submit"
                  disabled={aiLoading || !inputMessage.trim()}
                  className="btn btn-warning rounded-circle p-2 text-white shadow-sm d-flex align-items-center justify-content-center"
                  style={{ width: '36px', height: '36px' }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}

          {/* Human Support Form Tab */}
          {activeTab === 'human' && (
            <div className="p-4 overflow-y-auto flex-grow-1">
              {humanSentSuccess ? (
                <div className="text-center py-4 px-2">
                  <div className="bg-success bg-opacity-15 text-success p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                    <CheckCircle2 size={40} />
                  </div>
                  <h5 className="fw-extrabold text-dark mb-2 font-heading">Murojaatingiz Yuborildi!</h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                    Menejerimiz qisqa vaqt ichida ko‘rsatilgan telefon raqamingiz orqali bog‘lanadi.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHumanSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-extrabold text-dark mb-1 d-flex align-items-center gap-1">
                      <HelpCircle size={14} className="text-warning" />
                      <span>Muammo Turi</span>
                    </label>
                    <div className="input-group rounded-3 overflow-hidden border">
                      <span className="input-group-text border-0 bg-light text-warning ps-3">
                        <HelpCircle size={16} />
                      </span>
                      <select
                        className="form-select border-0 bg-light py-2 shadow-none small fw-bold text-dark"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option value="Buyurtma bo‘yicha">🛍️ Buyurtma bo‘yicha</option>
                        <option value="Yetkazib berish">🛵 Yetkazib berish</option>
                        <option value="To‘lov">💳 To‘lov masalasi</option>
                        <option value="Sifat va Taklif">⭐ Sifat va Taklif</option>
                        <option value="Boshqa">❓ Boshqa savol</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-extrabold text-dark mb-1 d-flex align-items-center gap-1">
                      <User size={14} className="text-warning" />
                      <span>Ismingiz</span>
                    </label>
                    <div className="input-group rounded-3 overflow-hidden border">
                      <span className="input-group-text border-0 bg-light text-warning ps-3">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        className="form-control border-0 bg-light py-2 shadow-none small fw-medium"
                        placeholder="Ismingizni kiriting"
                        required
                        value={formData.senderName}
                        onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-extrabold text-dark mb-1 d-flex align-items-center gap-1">
                      <Phone size={14} className="text-warning" />
                      <span>Telefon Raqamingiz</span>
                    </label>
                    <div className="input-group rounded-3 overflow-hidden border">
                      <span className="input-group-text border-0 bg-light text-warning ps-3">
                        <Phone size={16} />
                      </span>
                      <input
                        type="tel"
                        className="form-control border-0 bg-light py-2 shadow-none small fw-medium"
                        placeholder="+998 90 123 45 67"
                        required
                        value={formData.senderPhone}
                        onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-extrabold text-dark mb-1 d-flex align-items-center gap-1">
                      <MessageSquare size={14} className="text-warning" />
                      <span>Muammo Tavsifi</span>
                    </label>
                    <div className="input-group rounded-3 overflow-hidden border">
                      <textarea
                        className="form-control border-0 bg-light p-3 shadow-none small fw-medium"
                        rows="3"
                        placeholder="Duch kelgan muammoingizni batafsil yozing..."
                        required
                        value={formData.messageText}
                        onChange={(e) => setFormData({ ...formData, messageText: e.target.value })}
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={humanLoading}
                    className="btn btn-warning w-100 py-2.5 rounded-pill fw-extrabold text-white shadow d-flex align-items-center justify-content-center gap-2 transition-transform hover-lift"
                    style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
                  >
                    <Send size={18} />
                    <span>{humanLoading ? 'Yuborilmoqda...' : 'Operatorga Yuborish'}</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerChatWidget;
