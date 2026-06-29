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
import { useViewMode } from '../hooks/useViewMode';
import './Dashboard.css';

export default function Dashboard({
  products,
  productsLoading = false,
  syncError = null,
  onDismissSyncError,
  user = null,
  onSignOut = null,
  onEnableSync = null,
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [sortSheetOpen, setSortSheetOpen] = useState(false);
  const [sortBy, setSortBy] = useSort();
  const [view, setView] = useViewMode();

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

  const categoryFiltered = useMemo(
    () =>
      activeCategory === 'All'
        ? activeProducts
        : activeProducts.filter((p) => p.category === activeCategory),
    [activeProducts, activeCategory]
  );

  const subcatCounts = useMemo(() => {
    const counts = {};
    categoryFiltered.forEach((p) => {
      if (p.subcategory) counts[p.subcategory] = (counts[p.subcategory] || 0) + 1;
    });
    return counts;
  }, [categoryFiltered]);

  const displayedProducts = useMemo(() => {
    const list =
      activeSubcategory === 'All'
        ? categoryFiltered
        : categoryFiltered.filter((p) => p.subcategory === activeSubcategory);
    return sortProducts(list, sortBy);
  }, [categoryFiltered, activeSubcategory, sortBy]);

  const currentSortOption = SORT_OPTIONS.find((o) => o.value === sortBy);
  const showSortLabel = sortBy !== 'expiring-soon';
  const subcats = activeCategory !== 'All' ? (SUBCATEGORIES[activeCategory] ?? []) : [];

  const avatarUrl = user?.user_metadata?.avatar_url;
  const userName = user?.user_metadata?.full_name || user?.email || '';

  return (
    <div className="page dashboard">
      <header className="page-header dashboard-header">
        <div className="dashboard-header__left">
          <h1>GlamTrack</h1>
          <p>Your beauty collection</p>
        </div>

        <div className="dashboard-header__right">
          {user ? (
            <>
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="dashboard-avatar"
                  referrerPolicy="no-referrer"
                  title={userName}
                />
              )}
              {onSignOut && (
                <button className="dashboard-signout" onClick={onSignOut} title="Sign out">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </>
          ) : onEnableSync ? (
            <button className="dashboard-sync-btn" onClick={onEnableSync}>
              ☁ Sync
            </button>
          ) : null}
        </div>
      </header>

      {syncError && (
        <div className="sync-error-banner">
          <span>⚠️ {syncError}</span>
          {onDismissSyncError && (
            <button className="sync-error-banner__close" onClick={onDismissSyncError}>✕</button>
          )}
        </div>
      )}

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
        view={view}
        onViewChange={setView}
      />

      {subcats.length > 0 && (
        <SubcategoryChips
          subcategories={subcats}
          active={activeSubcategory}
          onChange={setActiveSubcategory}
          counts={subcatCounts}
        />
      )}

      {productsLoading ? (
        <div className="products-loading">
          <span className="products-loading__spinner" />
          <p>Syncing your collection…</p>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="empty-state">
          <span>✨</span>
          <p>
            {products.length === 0
              ? 'No products yet. Tap + to add your first item!'
              : 'No products match this filter.'}
          </p>
        </div>
      ) : (
        <div className={view === 'grid' ? 'dashboard__grid' : 'dashboard__list'}>
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} view={view} />
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
