import { useState, useMemo } from 'react';
import StatCard from '../components/StatCard';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import FAB from '../components/FAB';
import { CATEGORY_TABS } from '../utils/constants';
import { isExpiringSoon } from '../utils/expiry';
import './Dashboard.css';

export default function Dashboard({ products }) {
  const [activeCategory, setActiveCategory] = useState('All');

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

  const filtered = useMemo(() => {
    const list =
      activeCategory === 'All'
        ? activeProducts
        : activeProducts.filter((p) => p.category === activeCategory);
    return [...list].sort((a, b) => {
      const da = a.name.toLowerCase();
      const db = b.name.toLowerCase();
      return da.localeCompare(db);
    });
  }, [activeProducts, activeCategory]);

  return (
    <div className="page dashboard">
      <header className="page-header">
        <h1>GlamTrack</h1>
        <p>Your beauty collection</p>
      </header>

      <div className="dashboard__stats">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="In Use" value={stats.inUse} accent="accent" />
        <StatCard label="Unopened" value={stats.unopened} />
        <StatCard label="Expiring" value={stats.expiringSoon} accent="warning" />
      </div>

      <CategoryTabs
        tabs={CATEGORY_TABS}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span>✨</span>
          <p>
            {products.length === 0
              ? 'No products yet. Tap + to add your first item!'
              : 'No products in this category.'}
          </p>
        </div>
      ) : (
        <div className="dashboard__list">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <FAB />
    </div>
  );
}
