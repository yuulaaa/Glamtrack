import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { generateId, CATEGORIES, STATUSES } from '../utils/constants';
import './AddProduct.css';

const todayStr = () => new Date().toISOString().split('T')[0];

function compressImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 800;
        let { width, height } = img;
        if (width > MAX || height > MAX) {
          if (width >= height) {
            height = Math.round((height * MAX) / width);
            width = MAX;
          } else {
            width = Math.round((width * MAX) / height);
            height = MAX;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function buildInitialForm(product) {
  if (!product) {
    return {
      name: '',
      brand: '',
      category: 'Skincare',
      status: 'Unopened',
      purchaseDate: todayStr(),
      openedDate: '',
      expiryDate: '',
      paoMonths: '',
      notes: '',
      imageBase64: '',
    };
  }
  return {
    name: product.name ?? '',
    brand: product.brand ?? '',
    category: product.category ?? 'Skincare',
    status: product.status ?? 'Unopened',
    purchaseDate: product.purchaseDate ?? todayStr(),
    openedDate: product.openedDate ?? '',
    expiryDate: product.expiryDate ?? '',
    paoMonths: product.paoMonths != null ? String(product.paoMonths) : '',
    notes: product.notes ?? '',
    imageBase64: product.imageBase64 ?? '',
  };
}

export default function AddProduct({ onAdd, product, onUpdate }) {
  const isEditing = Boolean(product);
  const navigate = useNavigate();
  const [form, setForm] = useState(() => buildInitialForm(product));
  const [compressing, setCompressing] = useState(false);

  const update = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'status' && value === 'In Use' && !prev.openedDate) {
        next.openedDate = todayStr();
      }
      if (field === 'status' && value === 'Unopened') {
        next.openedDate = '';
      }
      return next;
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCompressing(true);
    try {
      const compressed = await compressImage(file);
      update('imageBase64', compressed);
    } finally {
      setCompressing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const payload = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      category: form.category,
      status: form.status,
      purchaseDate: form.purchaseDate || null,
      openedDate: form.status === 'In Use' ? form.openedDate || todayStr() : null,
      expiryDate: form.expiryDate || null,
      paoMonths: form.paoMonths ? Number(form.paoMonths) : null,
      notes: form.notes.trim(),
      imageBase64: form.imageBase64 || null,
    };

    if (isEditing) {
      onUpdate(product.id, payload);
      navigate(`/product/${product.id}`);
    } else {
      onAdd({ id: generateId(), ...payload });
      navigate('/');
    }
  };

  return (
    <div className="page add-product">
      <Link to={isEditing ? `/product/${product.id}` : '/'} className="back-link">
        ← Back
      </Link>

      <header className="page-header">
        <h1>{isEditing ? 'Edit Product' : 'Add Product'}</h1>
        <p>{isEditing ? 'Update your product details' : 'Track a new beauty item'}</p>
      </header>

      <form onSubmit={handleSubmit} className="add-product__form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="e.g. Hydrating Serum"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            type="text"
            value={form.brand}
            onChange={(e) => update('brand', e.target.value)}
            placeholder="e.g. Glossier"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <div className="status-toggle">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                className={`status-toggle__btn ${form.status === s ? 'status-toggle__btn--active' : ''}`}
                onClick={() => update('status', s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            id="expiryDate"
            type="date"
            value={form.expiryDate}
            onChange={(e) => update('expiryDate', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="paoMonths">PAO (months after opening)</label>
          <input
            id="paoMonths"
            type="number"
            min="1"
            max="60"
            value={form.paoMonths}
            onChange={(e) => update('paoMonths', e.target.value)}
            placeholder="e.g. 12"
          />
        </div>

        {form.status === 'In Use' && (
          <div className="form-group">
            <label htmlFor="openedDate">Opened Date</label>
            <input
              id="openedDate"
              type="date"
              value={form.openedDate}
              onChange={(e) => update('openedDate', e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="Shade, batch number, where you bought it..."
          />
        </div>

        <div className="form-group">
          <label>Photo (optional)</label>
          <div className="image-upload">
            {compressing ? (
              <div className="image-upload__compressing">
                <span className="image-upload__spinner" />
                Compressing…
              </div>
            ) : form.imageBase64 ? (
              <div className="image-upload__preview">
                <img src={form.imageBase64} alt="Preview" />
                <button
                  type="button"
                  className="image-upload__remove"
                  onClick={() => update('imageBase64', '')}
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="image-upload__dropzone">
                <span>📷 Tap to upload</span>
                <input type="file" accept="image/*" onChange={handleImage} hidden />
              </label>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={!form.name.trim() || compressing}
        >
          {isEditing ? 'Update Product' : 'Save Product'}
        </button>
      </form>
    </div>
  );
}
