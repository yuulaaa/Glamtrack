import { getDaysLeft } from './expiry';

const STATUS_ORDER = { Unopened: 0, 'In Use': 1, Finished: 2 };

export function sortProducts(products, sortBy) {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'expiring-soon': {
        const da = getDaysLeft(a);
        const db = getDaysLeft(b);
        // Null (no expiry set) sorts last
        if (da === null && db === null) return 0;
        if (da === null) return 1;
        if (db === null) return -1;
        return da - db;
      }
      case 'opened-date': {
        const ta = a.openedDate ? new Date(a.openedDate).getTime() : 0;
        const tb = b.openedDate ? new Date(b.openedDate).getTime() : 0;
        return tb - ta; // most recent first
      }
      case 'name-az':
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      case 'status':
        return (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99);
      default:
        return 0;
    }
  });
}
