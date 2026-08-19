import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Instagram, Facebook, Twitter, Award, Star, CheckCircle } from 'lucide-react';
import chefService from '../services/chefService';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const ChefDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChef = async () => {
      try {
        setLoading(true);
        const res = await chefService.getChefById(id);
        if (res.success && res.data) {
          setChef(res.data);
        } else {
          setError('Chef profile not found.');
        }
      } catch (err) {
        setError(err.message || 'Failed to load chef details.');
      } finally {
        setLoading(false);
      }
    };
    fetchChef();
  }, [id]);

  if (loading) return <Loading text="Loading chef profile..." />;
  if (error) return <div className="container py-5"><ErrorMessage message={error} /></div>;
  if (!chef) return null;

  return (
    <div className="chef-details-page py-5 bg-light min-vh-100">
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-sm rounded-pill mb-4 d-inline-flex align-items-center gap-1">
          <ArrowLeft size={16} /> Back to Chefs
        </button>

        <div className="card border-0 rounded-4 shadow-lg bg-white overflow-hidden p-4 p-lg-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <img
                src={chef.image}
                alt={chef.name}
                className="img-fluid rounded-4 object-fit-cover w-100 shadow-sm"
                style={{ height: '420px' }}
              />
            </div>

            <div className="col-lg-7">
              <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill fw-bold mb-2">
                {chef.title}
              </span>

              <h1 className="display-5 fw-extrabold text-dark mb-3">{chef.name}</h1>

              <div className="d-flex align-items-center gap-3 mb-4">
                <span className="badge bg-dark text-warning rounded-pill px-3 py-2 fw-bold fs-6">
                  ★ {chef.rating} / 5.0 Rating
                </span>
                <span className="text-muted fw-semibold">
                  <Award size={18} className="text-warning me-1" />
                  {chef.experienceYears} Years Culinary Experience
                </span>
              </div>

              <p className="text-secondary lead mb-4" style={{ lineHeight: '1.8' }}>
                {chef.bio}
              </p>

              <h6 className="fw-bold text-dark mb-3">Signature Culinary Specialties:</h6>
              <div className="d-flex gap-2 flex-wrap mb-4">
                {chef.specialties && chef.specialties.map((spec, idx) => (
                  <div key={idx} className="bg-light border rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold text-dark">
                    <CheckCircle size={16} className="text-success" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-top d-flex align-items-center gap-3">
                <span className="fw-bold text-dark">Connect:</span>
                <a href={chef.socialLinks?.instagram || '#'} className="btn btn-outline-dark btn-sm rounded-circle p-2" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href={chef.socialLinks?.facebook || '#'} className="btn btn-outline-dark btn-sm rounded-circle p-2" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href={chef.socialLinks?.twitter || '#'} className="btn btn-outline-dark btn-sm rounded-circle p-2" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDetails;
