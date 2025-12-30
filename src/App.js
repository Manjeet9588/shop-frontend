import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// --- STYLES (Amazon Theme) ---
const styles = {
  appContainer: {
    backgroundColor: '#EAEDED', // Amazon Light Gray Background
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    backgroundColor: '#131921', // Amazon Dark Blue Header
    padding: '10px 20px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none'
  },
  cartBtn: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold'
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white', // White cards
    padding: '20px',
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'contain',
    marginBottom: '10px',
    cursor: 'pointer'
  },
  productName: {
    fontSize: '1.1rem',
    fontWeight: 'normal',
    color: '#0F1111',
    textDecoration: 'none',
    lineHeight: '1.4',
    marginBottom: '5px'
  },
  price: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#0F1111'
  },
  button: {
    backgroundColor: '#FFD814', // Amazon Yellow Button
    border: '1px solid #FCD200',
    padding: '8px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px',
    width: '100%'
  },
  footer: {
    backgroundColor: '#232F3E', // Amazon Footer Color
    color: 'white',
    textAlign: 'center',
    padding: '40px 10px',
    marginTop: '40px',
    borderTop: '1px solid #3a4553'
  }
};

// --- COMPONENT 1: Product Details Page ---
function ProductScreen({ onAdd }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://manjeet-shop-api.onrender.com/api/products');
        const data = await response.json();
        setProduct(data.find((p) => p._id === id));
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <h2 style={{padding: '20px'}}>Loading...</h2>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', marginTop: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#007185' }}>&lt; Back to results</Link>
      <div style={{ display: 'flex', gap: '3rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <img src={product.image} alt={product.name} style={{ maxWidth: '400px', width: '100%', objectFit: 'contain' }} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.8rem', color: '#0F1111' }}>{product.name}</h1>
          <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '10px 0' }}/>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#B12704' }}>${product.price}</p>
          <p style={{ lineHeight: '1.5', color: '#333' }}>{product.description}</p>
          <button onClick={() => onAdd(product)} style={styles.button}>Add to Cart</button>
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
        console.log("Error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={styles.appContainer}>
      {/* Banner Image */}
      <img src="https://images-eu.ssl-images-amazon.com/images/G/31/Events/img23/Jupiter23/Homepage/J23_PC_Header_UNREC_V2_2x._CB576595603_.jpg" alt="Banner" style={{ width: '100%', objectFit: 'cover', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))' }} />
      
      <div style={{ padding: '0 20px', marginTop: '-100px', position: 'relative', zIndex: 10 }}>
        <h2 style={{ color: '#fff', marginLeft: '20px', textShadow: '1px 1px 2px black' }}>Your Recommendations</h2>
        <div style={styles.grid}>
          {products.map((product) => (
            <div key={product._id} style={styles.card}>
              <h3 style={{fontSize: '1.2rem', marginBottom: '10px'}}><Link to={`/product/${product._id}`} style={styles.productName}>{product.name}</Link></h3>
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} style={styles.image} />
              </Link>
              <div style={{marginTop: 'auto'}}>
                <span style={{color: '#565959', fontSize: '0.9rem'}}>Price: </span>
                <span style={styles.price}>${product.price}</span>
                <Link to={`/product/${product._id}`} style={{display: 'block', color: '#007185', textDecoration: 'none', marginTop: '5px'}}>See more</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 3: Cart Screen ---
function CartScreen({ cartItems, onRemove }) {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'white', maxWidth: '1000px', margin: '20px auto' }}>
      <h2 style={{borderBottom: '1px solid #ddd', paddingBottom: '10px'}}>Shopping Cart</h2>
      {cartItems.length === 0 && <div>Your Amazon Cart is empty. <Link to="/" style={{color: '#007185'}}>Shop today's deals</Link></div>}
      {cartItems.map((item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '1rem' }}>
          <div style={{display: 'flex', gap: '1rem'}}>
            <img src={item.image} alt={item.name} style={{ width: '100px', objectFit: 'contain' }} />
            <div>
              <h3 style={{fontSize: '1.2rem'}}>{item.name}</h3>
              <span style={{color: '#B12704', fontWeight: 'bold'}}>${item.price}</span>
            </div>
          </div>
          <button onClick={() => onRemove(item)} style={{ backgroundColor: '#ddd', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '5px', height: 'fit-content' }}>Delete</button>
        </div>
      ))}
      {cartItems.length !== 0 && (
        <h3 style={{textAlign: 'right'}}>Subtotal ({cartItems.length} items): <b>${cartItems.reduce((a, c) => a + c.price, 0)}</b></h3>
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
      <div style={styles.appContainer}>
        {/* Amazon Header */}
        <header style={styles.header}>
          <Link to="/" style={styles.logo}>amazon<span style={{fontSize: '0.8rem'}}>.in</span></Link>
          
          {/* Visual Search Bar */}
          <div style={{ flex: 1, margin: '0 20px', display: 'flex' }}>
             <input type="text" placeholder="Search Amazon.in" style={{ width: '100%', padding: '8px', borderRadius: '4px 0 0 4px', border: 'none', outline: 'none' }} />
             <button style={{ backgroundColor: '#FFD814', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer' }}>🔍</button>
          </div>

          <Link to="/cart" style={styles.cartBtn}>
            🛒 Cart <span style={{ color: '#F08804' }}>{cartItems.length}</span>
          </Link>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen onAdd={onAdd} />} />
            <Route path="/cart" element={<CartScreen cartItems={cartItems} onRemove={onRemove} />} />
          </Routes>
        </main>

        {/* --- FOOTER: YOUR NAMES ARE HERE --- */}
        <footer style={styles.footer}>
          <div style={{marginBottom: '20px', cursor: 'pointer', padding: '15px', backgroundColor: '#37475A', marginTop: '-40px'}} onClick={() => window.scrollTo(0,0)}>Back to top</div>
          
          <div style={{ padding: '20px' }}>
            <p style={{ fontSize: '1rem', marginBottom: '10px' }}>Developed by:</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
              Manjeet (23EE2421045) & Asmit Sharma (23EE2421012)
            </p>
          </div>
          
          <hr style={{ borderColor: '#3a4553', margin: '20px 0' }} />
          <p style={{ fontSize: '0.8rem', color: '#999' }}>© 1996-2025, Amazon.com, Inc. or its affiliates (Clone Project)</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;