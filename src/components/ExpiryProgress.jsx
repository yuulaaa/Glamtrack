import { getExpiryStatus, getExpiryProgress } from '../utils/expiry';
import './ExpiryProgress.css';

export default function ExpiryProgress({ product }) {
  const { level, daysLeft } = getExpiryStatus(product);
  const progress = getExpiryProgress(product);

  if (product.status === 'Finished' || daysLeft === null) return null;

  return (
    <div className="expiry-progress">
      <div className="expiry-progress__header">
        <span className="expiry-progress__label">Expiry Progress</span>
        <span className={`expiry-progress__days expiry-progress__days--${level}`}>
          {daysLeft < 0 ? 'Expired' : `${daysLeft} days remaining`}
        </span>
      </div>
      <div className="expiry-progress__track">
        <div
          className={`expiry-progress__fill expiry-progress__fill--${level}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
