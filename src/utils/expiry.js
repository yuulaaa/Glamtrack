function parseDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? null : d;
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getEffectiveExpiryDate(product) {
  const expiryDate = parseDate(product.expiryDate);
  const openedDate = parseDate(product.openedDate);
  const paoMonths = Number(product.paoMonths) || 0;

  let paoExpiry = null;
  if (openedDate && paoMonths > 0) {
    paoExpiry = new Date(openedDate);
    paoExpiry.setMonth(paoExpiry.getMonth() + paoMonths);
  }

  if (expiryDate && paoExpiry) {
    return expiryDate < paoExpiry ? expiryDate : paoExpiry;
  }
  return expiryDate || paoExpiry;
}

export function getDaysLeft(product) {
  if (product.status === 'Finished') return null;

  const effective = getEffectiveExpiryDate(product);
  if (!effective) return null;

  const today = startOfDay(new Date());
  const expiry = startOfDay(effective);
  const diffMs = expiry - today;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function getExpiryStatus(product) {
  if (product.status === 'Finished') {
    return { level: 'finished', label: 'Finished', daysLeft: null };
  }

  const daysLeft = getDaysLeft(product);
  if (daysLeft === null) {
    return { level: 'unknown', label: 'No expiry', daysLeft: null };
  }
  if (daysLeft < 0) {
    return { level: 'expired', label: 'Expired', daysLeft };
  }
  if (daysLeft < 30) {
    return { level: 'warning', label: `${daysLeft}d left`, daysLeft };
  }
  if (daysLeft <= 90) {
    return { level: 'caution', label: `${daysLeft}d left`, daysLeft };
  }
  return { level: 'good', label: `${daysLeft}d left`, daysLeft };
}

export function isExpiringSoon(product) {
  const daysLeft = getDaysLeft(product);
  return daysLeft !== null && daysLeft >= 0 && daysLeft < 30;
}

export function getExpiryProgress(product) {
  const effective = getEffectiveExpiryDate(product);
  if (!effective) return 0;

  const opened = parseDate(product.openedDate) || parseDate(product.purchaseDate);
  const start = opened ? startOfDay(opened) : startOfDay(new Date());
  const end = startOfDay(effective);
  const today = startOfDay(new Date());

  const total = end - start;
  if (total <= 0) return 100;

  const elapsed = today - start;
  const pct = (elapsed / total) * 100;
  return Math.min(100, Math.max(0, pct));
}
