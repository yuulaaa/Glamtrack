import { getDaysLeft } from '../utils/expiry';
import './StatusBadge.css';

export default function StatusBadge({ status }) {
  const classMap = {
    Unopened: 'status-badge--unopened',
    'In Use': 'status-badge--in-use',
    Finished: 'status-badge--finished',
  };

  return (
    <span className={`status-badge ${classMap[status] || ''}`}>
      {status}
    </span>
  );
}

export function ExpiryBadge({ product }) {
  if (product.status === 'Finished') return null;

  const daysLeft = getDaysLeft(product);
  if (daysLeft === null) return null;

  let level = 'good';
  let label = `${daysLeft}d left`;

  if (daysLeft < 0) {
    level = 'expired';
    label = 'Expired';
  } else if (daysLeft < 30) {
    level = 'warning';
  } else if (daysLeft <= 90) {
    level = 'caution';
  }

  return <span className={`status-badge status-badge--${level}`}>{label}</span>;
}
