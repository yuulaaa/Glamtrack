import { useNavigate, Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import StatusBadge, { ExpiryBadge } from '../components/StatusBadge';
import ExpiryProgress from '../components/ExpiryProgress';
import { getExpiryStatus } from '../utils/expiry';
import './ProductDetail.css';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ProductDetail({ product, onUpdate, onDelete }) {
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="page">
        <Link to="/" className="back-link">
          ← Back
        </Link>
        <div className="empty-state">
          <span>🔍</span>
          <p>Product not found.</p>
        </div>
      </div>
    );
  }

  const { level, daysLeft } = getExpiryStatus(product);
  const showWarning =
    product.status !== 'Finished' && daysLeft !== null && daysLeft >= 0 && daysLeft < 30;

  const handleMarkFinished = () => {
    onUpdate(product.id, { status: 'Finished' });
    navigate('/');
  };

  const handleDelete = () => {
    if (window.confirm('Delete this product permanently?')) {
      onDelete(product.id);
      navigate('/');
    }
  };

  return (
    <div className="page product-detail">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <div className="product-detail__hero">
        <ProductImage product={product} size="lg" />
      </div>

      <div className="product-detail__header">
        <h1>{product.name}</h1>
        {product.brand && <p className="product-detail__brand">{product.brand}</p>}
        <div className="product-detail__badges">
          <StatusBadge status={product.status} />
          <ExpiryBadge product={product} />
          <span className="product-detail__category">{product.category}</span>
        </div>
      </div>

      {showWarning && (
        <div className="warning-banner">
          <span className="warning-banner__icon">⚠️</span>
          <div>
            <strong>Expiring soon!</strong>
            <p>
              Only {daysLeft} day{daysLeft !== 1 ? 's' : ''} left — consider using or replacing
              this product.
            </p>
          </div>
        </div>
      )}

      {level === 'expired' && product.status !== 'Finished' && (
        <div className="warning-banner warning-banner--expired">
          <span className="warning-banner__icon">🚫</span>
          <div>
            <strong>Expired</strong>
            <p>This product is past its expiry date and should be discarded.</p>
          </div>
        </div>
      )}

      <ExpiryProgress product={product} />

      <div className="product-detail__info card">
        <div className="info-row">
          <span className="info-row__label">Status</span>
          <span className="info-row__value">{product.status}</span>
        </div>
        <div className="info-row">
          <span className="info-row__label">Purchase Date</span>
          <span className="info-row__value">{formatDate(product.purchaseDate)}</span>
        </div>
        {product.openedDate && (
          <div className="info-row">
            <span className="info-row__label">Opened</span>
            <span className="info-row__value">{formatDate(product.openedDate)}</span>
          </div>
        )}
        <div className="info-row">
          <span className="info-row__label">Expiry Date</span>
          <span className="info-row__value">{formatDate(product.expiryDate)}</span>
        </div>
        {product.paoMonths && (
          <div className="info-row">
            <span className="info-row__label">PAO</span>
            <span className="info-row__value">{product.paoMonths} months</span>
          </div>
        )}
        {product.notes && (
          <div className="info-row info-row--notes">
            <span className="info-row__label">Notes</span>
            <p className="info-row__notes">{product.notes}</p>
          </div>
        )}
      </div>

      <div className="product-detail__actions">
        {product.status !== 'Finished' && (
          <button className="btn btn-outline btn-block" onClick={handleMarkFinished}>
            Mark as Finished
          </button>
        )}
        <button className="btn btn-danger btn-block" onClick={handleDelete}>
          Delete Product
        </button>
      </div>
    </div>
  );
}
