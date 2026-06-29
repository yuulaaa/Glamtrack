import './CategoryTabs.css';

function SortIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="3"   width="14" height="2.2" rx="1" fill="currentColor" />
      <rect x="1" y="6.9" width="14" height="2.2" rx="1" fill="currentColor" />
      <rect x="1" y="10.8" width="14" height="2.2" rx="1" fill="currentColor" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1"   y="1"   width="6.2" height="6.2" rx="1.5" fill="currentColor" />
      <rect x="8.8" y="1"   width="6.2" height="6.2" rx="1.5" fill="currentColor" />
      <rect x="1"   y="8.8" width="6.2" height="6.2" rx="1.5" fill="currentColor" />
      <rect x="8.8" y="8.8" width="6.2" height="6.2" rx="1.5" fill="currentColor" />
    </svg>
  );
}

export default function CategoryTabs({
  active,
  onChange,
  tabs,
  onSortOpen,
  sortLabel,
  view,
  onViewChange,
}) {
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

        <div className="filter-bar__controls">
          {onSortOpen && (
            <button className="icon-ctrl-btn" onClick={onSortOpen} aria-label="Sort products">
              <SortIcon />
            </button>
          )}

          {onViewChange && (
            <div className="view-toggle" role="group" aria-label="View mode">
              <button
                className={`view-toggle__btn ${view === 'list' ? 'view-toggle__btn--active' : ''}`}
                onClick={() => onViewChange('list')}
                aria-label="List view"
                aria-pressed={view === 'list'}
              >
                <ListIcon />
              </button>
              <button
                className={`view-toggle__btn ${view === 'grid' ? 'view-toggle__btn--active' : ''}`}
                onClick={() => onViewChange('grid')}
                aria-label="Grid view"
                aria-pressed={view === 'grid'}
              >
                <GridIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {sortLabel && (
        <button className="sort-label" onClick={onSortOpen}>
          Sort: <strong>{sortLabel}</strong>
        </button>
      )}
    </div>
  );
}
