import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import faqService from '../services/faqService';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const res = await faqService.getFAQs();
        if (res.success && res.data) {
          setFaqs(res.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load FAQ items.');
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="faq-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill fw-bold mb-2">
            Got Questions?
          </span>
          <h1 className="display-5 fw-extrabold text-dark">Frequently Asked Questions</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '560px' }}>
            Everything you need to know about our ordering process, food delivery, and restaurant policies.
          </p>
        </div>

        {loading ? (
          <Loading text="Loading FAQs..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="mx-auto" style={{ maxWidth: '780px' }}>
            {faqs.map((faq, idx) => (
              <div key={faq._id || idx} className="card border-0 rounded-4 shadow-sm bg-white mb-3 overflow-hidden">
                <button
                  className="btn text-start p-4 w-100 d-flex align-items-center justify-content-between text-decoration-none"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span className="fw-bold fs-5 text-dark pe-3 d-flex align-items-center gap-2">
                    <HelpCircle size={20} className="text-warning flex-shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-muted transition-transform flex-shrink-0 ${
                      openIndex === idx ? 'rotate-180 text-warning' : ''
                    }`}
                    style={{ transform: openIndex === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}
                  />
                </button>
                {openIndex === idx && (
                  <div className="px-4 pb-4 border-top pt-3 text-secondary" style={{ lineHeight: '1.8' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqPage;
