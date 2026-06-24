export const STORAGE_KEY = 'glamtrack-products';

export const CATEGORIES = ['Skincare', 'Makeup', 'Fragrance', 'Tools', 'Other'];

export const CATEGORY_TABS = ['All', ...CATEGORIES.filter((c) => c !== 'Other')];

export const STATUSES = ['Unopened', 'In Use', 'Finished'];

export const CATEGORY_PLACEHOLDERS = {
  Skincare: { icon: '🫙', bg: '#FFF0E6' },
  Makeup: { icon: '💄', bg: '#FFE8F0' },
  Fragrance: { icon: '🫧', bg: '#F0E8FF' },
  Tools: { icon: '🖌️', bg: '#E8F5E8' },
  Other: { icon: '✨', bg: '#FFF8E8' },
};

export function generateId() {
  return crypto.randomUUID();
}
