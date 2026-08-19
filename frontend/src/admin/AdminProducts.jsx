import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Star, Search, Image as ImageIcon } from 'lucide-react';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    isAvailable: true,
    isPopular: false,
  });

  const [saving, setSaving] = useState(false);

  const fetchProductsAndCategories = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories(),
      ]);

      if (prodRes.success && prodRes.data) {
        setProducts(prodRes.data);
      }
      if (catRes.success && catRes.data) {
        setCategories(catRes.data);
        if (catRes.data.length > 0 && !formData.category) {
          setFormData((prev) => ({ ...prev, category: catRes.data[0]._id }));
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: categories.length > 0 ? categories[0]._id : '',
      image: '',
      isAvailable: true,
      isPopular: false,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: typeof product.category === 'object' ? product.category._id : product.category,
      image: product.image,
      isAvailable: product.isAvailable,
      isPopular: product.isPopular,
    });
    setShowModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct._id, formData);
      } else {
        await productService.createProduct(formData);
      }
      setShowModal(false);
      fetchProductsAndCategories();
    } catch (err) {
      setError(err.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      setDeleteConfirmId(null);
      fetchProductsAndCategories();
    } catch (err) {
      setError(err.message || 'Failed to delete product.');
    }
  };

  const handleToggleAvailable = async (product) => {
    try {
      await productService.updateProduct(product._id, {
        isAvailable: !product.isAvailable,
      });
      fetchProductsAndCategories();
    } catch (err) {
      setError(err.message || 'Failed to toggle availability.');
    }
  };

  const handleTogglePopular = async (product) => {
    try {
      await productService.updateProduct(product._id, {
        isPopular: !product.isPopular,
      });
      fetchProductsAndCategories();
    } catch (err) {
      setError(err.message || 'Failed to toggle popular status.');
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-products-page">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
        <div>
          <h2 className="fw-extrabold text-dark mb-1">Product Management</h2>
          <p className="text-secondary">Add, edit, toggle availability, or delete food items from the menu.</p>
        </div>

        <button onClick={handleOpenCreateModal} className="btn btn-primary-custom px-4 py-2 d-flex align-items-center gap-2">
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {/* Search Input */}
      <div className="card border-0 rounded-4 shadow-sm p-3 mb-4 bg-white">
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0 rounded-start-pill ps-3">
            <Search size={18} className="text-muted" />
          </span>
          <input
            type="text"
            className="form-control bg-light border-start-0 rounded-end-pill"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <Loading text="Loading product inventory..." />
      ) : (
        <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Popular</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((prod) => (
                    <tr key={prod._id}>
                      <td>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="rounded-3 object-fit-cover"
                          style={{ width: '50px', height: '50px' }}
                        />
                      </td>
                      <td>
                        <div className="fw-bold text-dark">{prod.name}</div>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: '200px' }}>
                          {prod.description}
                        </small>
                      </td>
                      <td>
                        <span className="badge bg-secondary bg-opacity-10 text-dark">
                          {typeof prod.category === 'object' ? prod.category.name : 'Category'}
                        </span>
                      </td>
                      <td className="fw-extrabold text-primary">${prod.price.toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => handleToggleAvailable(prod)}
                          className={`btn btn-sm rounded-pill px-3 ${
                            prod.isAvailable
                              ? 'btn-success bg-opacity-10 text-success border-success'
                              : 'btn-danger bg-opacity-10 text-danger border-danger'
                          }`}
                        >
                          {prod.isAvailable ? 'In Stock' : 'Unavailable'}
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleTogglePopular(prod)}
                          className={`btn btn-sm rounded-circle p-2 ${
                            prod.isPopular ? 'text-warning bg-warning bg-opacity-10' : 'text-muted bg-light'
                          }`}
                          title="Toggle Popular Status"
                        >
                          <Star size={16} fill={prod.isPopular ? '#ff9800' : 'none'} />
                        </button>
                      </td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            className="btn btn-outline-primary btn-sm rounded-circle p-2"
                            title="Edit Product"
                          >
                            <Edit2 size={16} />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(prod._id)}
                            className="btn btn-outline-danger btn-sm rounded-circle p-2"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal fade show d-block modal-backdrop-custom" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 p-4 text-center">
              <h5 className="fw-bold text-dark mb-3">Confirm Delete</h5>
              <p className="text-muted mb-4">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-light rounded-pill px-4" onClick={() => setDeleteConfirmId(null)}>
                  Cancel
                </button>
                <button className="btn btn-danger rounded-pill px-4" onClick={() => handleDeleteProduct(deleteConfirmId)}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Product Modal */}
      {showModal && (
        <div className="modal fade show d-block modal-backdrop-custom" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 p-4">
              <div className="modal-header border-0 pb-0">
                <h4 className="fw-bold text-dark">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h4>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <form onSubmit={handleSaveProduct}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label fw-semibold">Product Name</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control rounded-3"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Category</label>
                      <select
                        className="form-select rounded-3"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Image URL</label>
                      <input
                        type="url"
                        className="form-control rounded-3"
                        placeholder="https://images.unsplash.com/..."
                        required
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Description</label>
                      <textarea
                        className="form-control rounded-3"
                        rows="3"
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <div className="form-check form-switch mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isAvailable"
                          checked={formData.isAvailable}
                          onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                        />
                        <label className="form-check-label fw-semibold" htmlFor="isAvailable">
                          Available for Order
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-check form-switch mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isPopular"
                          checked={formData.isPopular}
                          onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                        />
                        <label className="form-check-label fw-semibold" htmlFor="isPopular">
                          Highlight as Popular
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-3">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-primary-custom rounded-pill px-4">
                    {saving ? 'Saving...' : 'Save Product'}
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

export default AdminProducts;
