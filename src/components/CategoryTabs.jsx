import './CategoryTabs.css';

export default function CategoryTabs({ active, onChange, tabs }) {
  return (
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
  );
}
