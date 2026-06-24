import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useProducts } from './hooks/useProducts';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';

function ProductDetailRoute({ products, onUpdate, onDelete }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  return <ProductDetail product={product} onUpdate={onUpdate} onDelete={onDelete} />;
}

function EditProductRoute({ products, onUpdate }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  return <AddProduct product={product} onUpdate={onUpdate} />;
}

function AppRoutes() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  return (
    <Routes>
      <Route path="/" element={<Dashboard products={products} />} />
      <Route path="/add" element={<AddProduct onAdd={addProduct} />} />
      <Route
        path="/product/:id"
        element={
          <ProductDetailRoute
            products={products}
            onUpdate={updateProduct}
            onDelete={deleteProduct}
          />
        }
      />
      <Route
        path="/product/:id/edit"
        element={<EditProductRoute products={products} onUpdate={updateProduct} />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
