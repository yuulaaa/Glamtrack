import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import StatusBadge, { ExpiryBadge } from './StatusBadge';
import { getDaysLeft } from '../utils/expiry';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const daysLeft = getDaysLeft(product);

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
        </div>
      </div>
    </Link>
  );
}
