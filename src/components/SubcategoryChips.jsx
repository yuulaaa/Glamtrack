import './SubcategoryChips.css';

export default function SubcategoryChips({ subcategories, active, onChange, counts }) {
  if (!subcategories.length) return null;

  const totalCount = Object.values(counts).reduce((s, n) => s + n, 0);

  return (
    <div className="subcategory-chips">
      <button
        className={`subcat-chip ${active === 'All' ? 'subcat-chip--active' : ''}`}
        onClick={() => onChange('All')}
      >
        All
        <span className="subcat-chip__count">{totalCount}</span>
      </button>

      {subcategories.map((sub) => {
        const count = counts[sub] || 0;
        return (
          <button
            key={sub}
            className={`subcat-chip ${active === sub ? 'subcat-chip--active' : ''}`}
            onClick={() => onChange(sub)}
          >
            {sub}
            <span className="subcat-chip__count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
