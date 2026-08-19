import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, PackageCheck, Clock, MapPin, Phone, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="order-success-page py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-xl-6">
            <div className="card border-0 rounded-4 shadow-lg text-center p-4 p-md-5 bg-white">
              <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle d-inline-flex mx-auto mb-4">
                <CheckCircle2 size={56} />
              </div>

              <h2 className="fw-extrabold text-dark mb-2">Order Confirmed!</h2>
              <p className="text-secondary lead mb-4">
                Your order has been successfully placed and sent to our kitchen.
              </p>

              <div className="bg-light rounded-4 p-4 text-start mb-4 border">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                  <div>
                    <span className="text-muted small d-block">Order ID</span>
                    <span className="fw-extrabold text-dark font-monospace">#{order._id}</span>
                  </div>
                  <span className="badge bg-warning text-dark px-3 py-2 rounded-pill text-uppercase font-heading">
                    Status: {order.status}
                  </span>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <span className="text-muted small d-block">Customer Name</span>
                    <span className="fw-bold text-dark">{order.customerName}</span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted small d-block">Phone Number</span>
                    <span className="fw-bold text-dark">{order.phone}</span>
                  </div>
                  <div className="col-12">
                    <span className="text-muted small d-block">Delivery Address</span>
                    <span className="fw-bold text-dark">{order.address}</span>
                  </div>
                </div>

                <div className="border-top pt-3">
                  <span className="text-muted small d-block mb-2">Items Ordered:</span>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="d-flex justify-content-between small text-dark mb-1">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="fw-bold">${item.subtotal.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between fs-5 fw-extrabold text-primary border-top pt-2 mt-2">
                    <span>Total Amount</span>
                    <span>${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link to="/" className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold">
                  Back to Home
                </Link>
                <Link to="/menu" className="btn btn-primary-custom rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center justify-content-center gap-2">
                  <span>Order Something Else</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
