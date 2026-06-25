import { useEffect } from 'react';
import { SORT_OPTIONS } from '../utils/constants';
import './SortSheet.css';

export default function SortSheet({ active, onChange, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSelect = (value) => {
    onChange(value);
    onClose();
  };

  return (
    <div className="sort-sheet" role="dialog" aria-modal="true" aria-label="Sort options">
      <div className="sort-sheet__backdrop" onClick={onClose} />
      <div className="sort-sheet__panel">
        <div className="sort-sheet__handle" />
        <h2 className="sort-sheet__title">Sort by</h2>

        <ul className="sort-sheet__list">
          {SORT_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                className={`sort-option ${active === opt.value ? 'sort-option--active' : ''}`}
                onClick={() => handleSelect(opt.value)}
              >
                <div className="sort-option__text">
                  <span className="sort-option__label">{opt.label}</span>
                  <span className="sort-option__desc">{opt.description}</span>
                </div>
                <span className="sort-option__radio">
                  {active === opt.value && <span className="sort-option__dot" />}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
