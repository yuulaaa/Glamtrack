import { useState, useMemo } from 'react';
import StatCard from '../components/StatCard';
import CategoryTabs from '../components/CategoryTabs';
import SubcategoryChips from '../components/SubcategoryChips';
import ProductCard from '../components/ProductCard';
import SortSheet from '../components/SortSheet';
import FAB from '../components/FAB';
import { CATEGORY_TABS, SUBCATEGORIES, SORT_OPTIONS } from '../utils/constants';
import { isExpiringSoon } from '../utils/expiry';
import { sortProducts } from '../utils/sort';
import { useSort } from '../hooks/useSort';
import './Dashboard.css';

export default function Dashboard({ products }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [sortSheetOpen, setSortSheetOpen] = useState(false);
  const [sortBy, setSortBy] = useSort();

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveSubcategory('All');
  };

  const activeProducts = useMemo(
    () => products.filter((p) => p.status !== 'Finished'),
    [products]
  );

  const stats = useMemo(
    () => ({
      total: activeProducts.length,
      inUse: activeProducts.filter((p) => p.status === 'In Use').length,
      unopened: activeProducts.filter((p) => p.status === 'Unopened').length,
      expiringSoon: activeProducts.filter(isExpiringSoon).length,
    }),
    [activeProducts]
  );

  // Products matching the selected main category
  const categoryFiltered = useMemo(
    () =>
      activeCategory === 'All'
        ? activeProducts
        : activeProducts.filter((p) => p.category === activeCategory),
    [activeProducts, activeCategory]
  );

  // Subcategory count map — always computed from categoryFiltered
  const subcatCounts = useMemo(() => {
    const counts = {};
    categoryFiltered.forEach((p) => {
      if (p.subcategory) {
        counts[p.subcategory] = (counts[p.subcategory] || 0) + 1;
      }
    });
    return counts;
  }, [categoryFiltered]);

  // Products after both category + subcategory filters, then sorted
  const displayedProducts = useMemo(() => {
    const list =
      activeSubcategory === 'All'
        ? categoryFiltered
        : categoryFiltered.filter((p) => p.subcategory === activeSubcategory);
    return sortProducts(list, sortBy);
  }, [categoryFiltered, activeSubcategory, sortBy]);

  const currentSortOption = SORT_OPTIONS.find((o) => o.value === sortBy);
  const showSortLabel = sortBy !== 'expiring-soon'; // hide label when on default
  const subcats = activeCategory !== 'All' ? (SUBCATEGORIES[activeCategory] ?? []) : [];

  return (
    <div className="page dashboard">
      <header className="page-header">
        <h1>GlamTrack</h1>
        <p>Your beauty collection</p>
      </header>

      <div className="dashboard__stats">
        <StatCard label="Total"    value={stats.total} />
        <StatCard label="In Use"   value={stats.inUse}        accent="accent" />
        <StatCard label="Unopened" value={stats.unopened} />
        <StatCard label="Expiring" value={stats.expiringSoon} accent="warning" />
      </div>

      <CategoryTabs
        tabs={CATEGORY_TABS}
        active={activeCategory}
        onChange={handleCategoryChange}
        onSortOpen={() => setSortSheetOpen(true)}
        sortLabel={showSortLabel ? currentSortOption?.label : null}
      />

      {subcats.length > 0 && (
        <SubcategoryChips
          subcategories={subcats}
          active={activeSubcategory}
          onChange={setActiveSubcategory}
          counts={subcatCounts}
        />
      )}

      {displayedProducts.length === 0 ? (
        <div className="empty-state">
          <span>✨</span>
          <p>
            {products.length === 0
              ? 'No products yet. Tap + to add your first item!'
              : 'No products match this filter.'}
          </p>
        </div>
      ) : (
        <div className="dashboard__list">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <FAB />

      {sortSheetOpen && (
        <SortSheet
          active={sortBy}
          onChange={setSortBy}
          onClose={() => setSortSheetOpen(false)}
        />
      )}
    </div>
  );
}
