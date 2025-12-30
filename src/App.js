import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// --- DATA: MORE PRODUCTS ADDED HERE ---
const localProducts = [
  {
    _id: '1',
    name: 'Nike Slim Shirt',
    category: 'Shirts',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 120,
    description: 'High quality slim shirt for sports and casual wear.'
  },
  {
    _id: '2',
    name: 'Adidas Fit Pant',
    category: 'Pants',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 100,
    description: 'Comfortable pants for running and gym activities.'
  },
  {
    _id: '3',
    name: 'Puma Running Shoes',
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 220,
    description: 'Lightweight running shoes with excellent grip.'
  },
  {
    _id: '4',
    name: 'Apple Watch Series 7',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 399,
    description: 'The latest Apple Watch with health tracking features.'
  },
  {
    _id: '5',
    name: 'Sony Headphones',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 150,
    description: 'Noise cancelling headphones for immersive music experience.'
  },
  {
    _id: '6',
    name: 'Ray-Ban Sunglasses',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 180,
    description: 'Classic aviator sunglasses for sunny days.'
  },
  {
    _id: '7',
    name: 'Leather Backpack',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 85,
    description: 'Stylish leather backpack for work and travel.'
  },
  {
    _id: '8',
    name: 'Gaming Mouse',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 45,
    description: 'High precision gaming mouse with RGB lighting.'
  }
];

// --- COMPONENT 1: Product Details Page ---
function ProductScreen({ onAdd }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find product from LOCAL data instead of fetching
    const foundProduct = localProducts.find((p) => p._id === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/" style={{ textDecoration: 'none', fontSize: '1.2rem' }}>⬅ Back to Shop</Link>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '400px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
        />
        <div>
          <h1>{product.name}</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>${product.price}</p>
          <p style={{ color: '#666', lineHeight: '1.6' }}>{product.description}</p>
          <button 
            onClick={() => onAdd(product)}
            style={{ 
              padding: '10px 20px', 
              fontSize: '1.2rem', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 2: Home Page ---
function HomeScreen() {
  // Use LOCAL data directly
  const [products] = useState(localProducts); 

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Featured Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        
        {products.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ddd', padding: '1rem', width: '250px', borderRadius: '8px' }}>
            <Link to={`/product/${product._id}`}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }} />
            </Link>
            <h3><Link to={`/product/${product._id}`} style={{ color: 'black', textDecoration: 'none' }}>{product.name}</Link></h3>
            <p style={{fontWeight: 'bold'}}>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- COMPONENT 3: Cart Screen ---
function CartScreen({ cartItems, onRemove }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 && <div>Cart is empty. <Link to="/">Go Shopping</Link></div>}
      {cartItems.map((item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '1rem' }}>
          <img src={item.image} alt={item.name} style={{ width: '50px' }} />
          <span>{item.name}</span>
          <span>${item.price}</span>
          <button onClick={() => onRemove(item)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>Remove</button>
        </div>
      ))}
      {cartItems.length !== 0 && (
        <h3>Total Price: ${cartItems.reduce((a, c) => a + c.price, 0)}</h3>
      )}
    </div>
  );
}

// --- MAIN APP COMPONENT ---
function App() {
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      alert("Item is already in cart!");
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    setCartItems(cartItems.filter((x) => x._id !== product._id));
  };

  return (
    <BrowserRouter>
      {/* Original Header */}
      <header style={{ backgroundColor: '#203040', padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>My Awesome Shop</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>
          Cart 🛒 {cartItems.length > 0 && <span style={{ backgroundColor: 'red', borderRadius: '50%', padding: '2px 8px', marginLeft: '5px', fontSize: '0.9rem' }}>{cartItems.length}</span>}
        </Link>
      </header>
      
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen onAdd={onAdd} />} />
          <Route path="/cart" element={<CartScreen cartItems={cartItems} onRemove={onRemove} />} />
        </Routes>
      </main>

      {/* Footer with Correct Names */}
      <footer style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#203040', color: 'white', textAlign: 'center' }}>
        <p>Developed by: <b>Manjeet (23EE2421045)</b> & <b>Asmit Sharma (23EE2421012)</b></p>
        <p style={{ fontSize: '0.8rem' }}>Minor Project Submission 2025</p>
      </footer>

    </BrowserRouter>
  );
}

export default App;