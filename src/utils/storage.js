import { STORAGE_KEY } from './constants';

export function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getProductById(products, id) {
  return products.find((p) => p.id === id);
}
