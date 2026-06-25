import './CategoryTabs.css';

function SortIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function CategoryTabs({ active, onChange, tabs, onSortOpen, sortLabel }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__row">
        <div className="category-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`category-tabs__tab ${active === tab ? 'category-tabs__tab--active' : ''}`}
              onClick={() => onChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {onSortOpen && (
          <button className="sort-btn" onClick={onSortOpen} aria-label="Sort products">
            <SortIcon />
          </button>
        )}
      </div>

      {sortLabel && (
        <button className="sort-label" onClick={onSortOpen}>
          Sort: <strong>{sortLabel}</strong>
        </button>
      )}
    </div>
  );
}
