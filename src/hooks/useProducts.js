import { useState, useEffect, useCallback } from 'react';
import { loadProducts, saveProducts } from '../utils/storage';

export function useProducts() {
  const [products, setProducts] = useState(() => loadProducts());

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const addProduct = useCallback((product) => {
    setProducts((prev) => [...prev, product]);
  }, []);

  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { products, addProduct, updateProduct, deleteProduct };
}
