import { CATEGORY_PLACEHOLDERS } from '../utils/constants';
import './ProductImage.css';

export default function ProductImage({ product, size = 'md' }) {
  const placeholder = CATEGORY_PLACEHOLDERS[product.category] || CATEGORY_PLACEHOLDERS.Other;

  if (product.imageBase64) {
    return (
      <div className={`product-image product-image--${size}`}>
        <img src={product.imageBase64} alt={product.name} />
      </div>
    );
  }

  return (
    <div
      className={`product-image product-image--${size} product-image--placeholder`}
      style={{ backgroundColor: placeholder.bg }}
    >
      <span>{placeholder.icon}</span>
    </div>
  );
}
