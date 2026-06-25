export const STORAGE_KEY = 'glamtrack-products';
export const SORT_STORAGE_KEY = 'glamtrack-sort';

export const CATEGORIES = ['Skincare', 'Makeup', 'Fragrance', 'Tools', 'Other'];

export const CATEGORY_TABS = ['All', ...CATEGORIES.filter((c) => c !== 'Other')];

export const STATUSES = ['Unopened', 'In Use', 'Finished'];

export const SUBCATEGORIES = {
  Skincare: [
    'Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Eye Cream',
    'Sunscreen', 'Mask', 'Oil', 'Exfoliator',
  ],
  Makeup: [
    'Lipstick', 'Lip Gloss', 'Foundation', 'Concealer', 'Blush',
    'Bronzer', 'Eyeshadow', 'Eyeliner', 'Mascara', 'Brow',
    'Setting Powder', 'Primer',
  ],
  Fragrance: ['Eau de Parfum', 'Eau de Toilette', 'Body Mist'],
  Tools: ['Brush', 'Sponge', 'Eyelash Curler', 'Other'],
  Other: [],
};

export const SORT_OPTIONS = [
  { value: 'expiring-soon', label: 'Expiring Soon', description: 'Soonest expiry first' },
  { value: 'opened-date', label: 'Opened Date',    description: 'Most recently opened first' },
  { value: 'name-az',     label: 'Name A→Z',       description: 'Alphabetical order' },
  { value: 'status',      label: 'Status',          description: 'Unopened · In Use · Finished' },
];

export const CATEGORY_PLACEHOLDERS = {
  Skincare:  { icon: '🫙',  bg: '#FFF0E6' },
  Makeup:    { icon: '💄',  bg: '#FFE8F0' },
  Fragrance: { icon: '🫧',  bg: '#F0E8FF' },
  Tools:     { icon: '🖌️', bg: '#E8F5E8' },
  Other:     { icon: '✨',  bg: '#FFF8E8' },
};

export function generateId() {
  return crypto.randomUUID();
}
