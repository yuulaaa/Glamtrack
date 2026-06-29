import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import StatusBadge, { ExpiryBadge } from './StatusBadge';
import { getDaysLeft } from '../utils/expiry';
import './ProductCard.css';

export default function ProductCard({ product, view = 'list' }) {
  const daysLeft = getDaysLeft(product);

  if (view === 'grid') {
    return (
      <Link to={`/product/${product.id}`} className="product-card product-card--grid">
        <div className="product-card__grid-img">
          <ProductImage product={product} size="grid" />
        </div>
        <div className="product-card__grid-body">
          <p className="product-card__grid-name">{product.name}</p>
          {product.brand && (
            <p className="product-card__grid-brand">{product.brand}</p>
          )}
          <div className="product-card__grid-meta">
            <StatusBadge status={product.status} />
            {daysLeft !== null && product.status !== 'Finished' && (
              <ExpiryBadge product={product} />
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <ProductImage product={product} size="md" />
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__brand">{product.brand}</p>
        <div className="product-card__meta">
          <StatusBadge status={product.status} />
          {daysLeft !== null && product.status !== 'Finished' && (
            <ExpiryBadge product={product} />
          )}
          {product.subcategory && (
            <span className="product-card__subcategory">{product.subcategory}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
