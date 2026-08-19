import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="terms-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="card border-0 rounded-4 shadow-sm bg-white p-4 p-md-5 mx-auto" style={{ maxWidth: '800px' }}>
          <div className="d-flex align-items-center gap-2 mb-3 text-warning fw-bold">
            <FileText size={24} /> Legal Documentation
          </div>
          <h1 className="fw-extrabold text-dark mb-4">Terms & Conditions</h1>
          <small className="text-muted d-block mb-4">Last Updated: August 2026</small>

          <h5 className="fw-bold text-dark mt-3">1. Ordering & Delivery Policy</h5>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            By placing an order on SavoryBites, you confirm that all delivery details provided are accurate. Delivery times are estimates and may vary slightly depending on weather and road conditions.
          </p>

          <h5 className="fw-bold text-dark mt-4">2. Food Safety & Allergen Notice</h5>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            While we take strict precautions against cross-contamination, our dishes are prepared in kitchens that handle nuts, dairy, gluten, and seafood. Customers with severe allergies must specify instructions during checkout.
          </p>

          <h5 className="fw-bold text-dark mt-4">3. Payment & Refund Policy</h5>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            Payments are accepted via Cash on Delivery or credit/debit cards. Refunds or replacements are issued for damaged or missing items reported within 30 minutes of receipt.
          </p>

          <h5 className="fw-bold text-dark mt-4">4. Privacy & Data Security</h5>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            We do not share customer contact details or delivery addresses with third parties outside of delivery processing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
