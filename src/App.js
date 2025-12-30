import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// product data
const data = [
  {
    id: '1',
    name: 'Nike Slim Shirt',
    price: 120,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    desc: 'High quality slim shirt for sports and casual wear.'
  },
  {
    id: '2',
    name: 'Adidas Fit Pant',
    price: 100,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    desc: 'Comfortable pants for running and gym activities.'
  },
  {
    id: '3',
    name: 'Puma Running Shoes',
    price: 220,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    desc: 'Lightweight running shoes with excellent grip.'
  },
  {
    id: '4',
    name: 'Apple Watch Series 7',
    price: 399,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    desc: 'The latest Apple Watch with health tracking features.'
  },
  {
    id: '5',
    name: 'Sony Headphones',
    price: 150,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    desc: 'Noise cancelling headphones for immersive music experience.'
  },
  {
    id: '6',
    name: 'Ray-Ban Sunglasses',
    price: 180,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    desc: 'Classic aviator sunglasses for sunny days.'
  },
  {
    id: '7',
    name: 'Leather Backpack',
    price: 85,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    desc: 'Stylish leather backpack for work and travel.'
  },
  {
    id: '8',
    name: 'Gaming Mouse',
    price: 45,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    desc: 'High precision gaming mouse with RGB lighting.'
  }
];

// Component for single product
function Product({ addToCart }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // finding product by id
    console.log("Current ID:", id);
    const p = data.find((x) => x.id === id);
    setItem(p);
  }, [id]);

  if (!item) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', fontSize: '18px' }}> Go Back</Link>
      <div style={{ display: 'flex', gap: '30px', marginTop: '20px', flexWrap: 'wrap' }}>
        <img src={item.image} alt={item.name} style={{ width: '400px', borderRadius: '10px' }} />
        <div>
          <h1>{item.name}</h1>
          <h2>Price: ${item.price}</h2>
          <p>{item.desc}</p>
          <button 
            onClick={() => addToCart(item)}
            style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// Home screen component
function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Latest Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.map((prod) => (
          <div key={prod.id} style={{ border: '1px solid #ccc', padding: '10px', width: '250px', borderRadius: '5px' }}>
            <Link to={`/product/${prod.id}`}>
              <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            </Link>
            <h3>{prod.name}</h3>
            <h4>${prod.price}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

// Cart page
function Cart({ cart, remove }) {
  // calculate total
  var total = 0;
  for(let i=0; i<cart.length; i++){
    total = total + cart[i].price;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : null}
      
      {cart.map((c) => (
        <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '10px' }}>
          <img src={c.image} width="50" alt="" />
          <b>{c.name}</b>
          <span>${c.price}</span>
          <button onClick={() => remove(c)} style={{ color: 'red' }}>Remove</button>
        </div>
      ))}

      {cart.length > 0 && <h3>Total Amount: ${total}</h3>}
    </div>
  );
}

// Main App
function App() {
  const [cart, setCart] = useState([]);

  // function to add item
  const add = (item) => {
    // check if item exists
    const check = cart.find(x => x.id === item.id);
    if (check) {
      alert("Added already");
    } else {
      console.log("Adding item:", item.name);
      setCart([...cart, item]);
    }
  };

  // function to remove item
  const remove = (item) => {
    setCart(cart.filter(x => x.id !== item.id));
  };

  return (
    <BrowserRouter>
      {/* Navbar */}
      <div style={{ backgroundColor: '#203040', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>My Awesome Shop</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>
          Cart ({cart.length})
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product addToCart={add} />} />
        <Route path="/cart" element={<Cart cart={cart} remove={remove} />} />
      </Routes>

      {/* Footer */}
      <footer style={{ marginTop: '50px', padding: '20px', backgroundColor: '#203040', color: 'white', textAlign: 'center' }}>
        <p>Developed by:</p>
        <p><b>Manjeet (23EE2421045)</b> & <b>Asmit Sharma (23EE2421012)</b></p>
      </footer>

    </BrowserRouter>
  );
}

export default App;