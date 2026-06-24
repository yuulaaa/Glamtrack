import { Link } from 'react-router-dom';
import './FAB.css';

export default function FAB() {
  return (
    <Link to="/add" className="fab" aria-label="Add product">
      +
    </Link>
  );
}
