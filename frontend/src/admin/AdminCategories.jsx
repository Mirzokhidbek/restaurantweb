import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Layers } from 'lucide-react';
import categoryService from '../services/categoryService';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoryService.getCategories();
      if (res.success && res.data) {
        setCategories(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', image: '' });
    setShowModal(true);
  };

  const handleOpenEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || '',
    });
    setShowModal(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory._id, formData);
      } else {
        await categoryService.createCategory(formData);
      }
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      setError(err.message || 'Failed to save category.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await categoryService.deleteCategory(id);
      setDeleteConfirmId(null);
      fetchCategories();
    } catch (err) {
      setError(err.message || 'Failed to delete category.');
    }
  };

  return (
    <div className="admin-categories-page">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
        <div>
          <h2 className="fw-extrabold text-dark mb-1">Category Management</h2>
          <p className="text-secondary">Create, update, or remove restaurant menu categories.</p>
        </div>

        <button onClick={handleOpenCreateModal} className="btn btn-primary-custom px-4 py-2 d-flex align-items-center gap-2">
          <Plus size={18} />
          <span>Add New Category</span>
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Loading text="Loading food categories..." />
      ) : (
        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden h-100 p-3 text-center">
                <div
                  className="mx-auto rounded-circle overflow-hidden mb-3 border shadow-sm"
                  style={{ width: '90px', height: '90px' }}
                >
                  <img
                    src={cat.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80'}
                    alt={cat.name}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>

                <h5 className="fw-bold text-dark mb-1">{cat.name}</h5>
                <p className="text-muted small mb-3 text-truncate" style={{ height: '36px' }}>
                  {cat.description || 'No description provided.'}
                </p>

                <div className="d-flex justify-content-center gap-2 pt-2 border-top">
                  <button
                    onClick={() => handleOpenEditModal(cat)}
                    className="btn btn-outline-primary btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(cat._id)}
                    className="btn btn-outline-danger btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal fade show d-block modal-backdrop-custom" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 p-4 text-center">
              <h5 className="fw-bold text-dark mb-3">Delete Category</h5>
              <p className="text-muted mb-4">Are you sure you want to delete this category? Products linked to this category may be affected.</p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-light rounded-pill px-4" onClick={() => setDeleteConfirmId(null)}>
                  Cancel
                </button>
                <button className="btn btn-danger rounded-pill px-4" onClick={() => handleDeleteCategory(deleteConfirmId)}>
                  Delete Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Category Modal */}
      {showModal && (
        <div className="modal fade show d-block modal-backdrop-custom" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 p-4">
              <div className="modal-header border-0 pb-0">
                <h4 className="fw-bold text-dark">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h4>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <form onSubmit={handleSaveCategory}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Category Name</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Image URL</label>
                    <input
                      type="url"
                      className="form-control rounded-3"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-3">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-primary-custom rounded-pill px-4">
                    {saving ? 'Saving...' : 'Save Category'}
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

export default AdminCategories;
