import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// --- COMPONENT 1: Product Details Page ---
function ProductScreen({ onAdd }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch all products from the cloud to find the right one
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://manjeet-shop-api.onrender.com/api/products');
        const data = await response.json();
        
        // Find the specific product that matches the ID in the URL
        const foundProduct = data.find((p) => p._id === id);
        setProduct(foundProduct);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (!product) return <h2>Loading Product...</h2>;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/" style={{ textDecoration: 'none', fontSize: '1.2rem' }}>⬅ Back to Shop</Link>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
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
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://manjeet-shop-api.onrender.com/api/products'); 
        const data = await response.json();
        setProducts(data); 
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Featured Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        
        {products.length === 0 && <div>Loading products from server...</div>}

        {products.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ddd', padding: '1rem', width: '250px', borderRadius: '8px' }}>
            <Link to={`/product/${product._id}`}>
              <img src={product.image} alt={product.name} style={{ width: '100%', cursor: 'pointer' }} />
            </Link>
            <h3><Link to={`/product/${product._id}`} style={{ color: 'black', textDecoration: 'none' }}>{product.name}</Link></h3>
            <p>${product.price}</p>
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
      {/* Header */}
      <header style={{ backgroundColor: '#203040', padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>My Awesome Shop</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>
          Cart 🛒 {cartItems.length > 0 && <span style={{ backgroundColor: 'red', borderRadius: '50%', padding: '2px 8px', marginLeft: '5px', fontSize: '0.9rem' }}>{cartItems.length}</span>}
        </Link>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen onAdd={onAdd} />} />
          <Route path="/cart" element={<CartScreen cartItems={cartItems} onRemove={onRemove} />} />
        </Routes>
      </main>

      {/* NEW FOOTER ADDED HERE */}
      <footer style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#203040', color: 'white', textAlign: 'center' }}>
        <p>Developed by: <b>Manjeet (R10061)</b> & <b>Asmit Sharma (R9674)</b></p>
        <p style={{ fontSize: '0.8rem' }}>Minor Project Submission 2025</p>
      </footer>

    </BrowserRouter>
  );
}

export default App;