import { useState } from 'react'
import './App.css'

const products = [
  { id: 1, name: 'Wireless Headphones', price: 1999, category: 'Electronics', emoji: '🎧', rating: 4.5 },
  { id: 2, name: 'Running Shoes', price: 2499, category: 'Fashion', emoji: '👟', rating: 4.2 },
  { id: 3, name: 'Backpack', price: 899, category: 'Fashion', emoji: '🎒', rating: 4.7 },
  { id: 4, name: 'USB-C Hub', price: 1299, category: 'Electronics', emoji: '🔌', rating: 4.0 },
  { id: 5, name: 'Water Bottle', price: 499, category: 'Home', emoji: '🧴', rating: 4.8 },
  { id: 6, name: 'Desk Lamp', price: 799, category: 'Home', emoji: '💡', rating: 4.3 },
  { id: 7, name: 'Bluetooth Speaker', price: 1499, category: 'Electronics', emoji: '🔊', rating: 4.6 },
  { id: 8, name: 'Notebook Set', price: 299, category: 'Home', emoji: '📒', rating: 4.1 },
  { id: 9, name: 'Sunglasses', price: 699, category: 'Fashion', emoji: '🕶', rating: 3.9 }
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [cart, setCart] = useState([])

  let categories = [
    { name: 'All', icon: '🛍' },
    { name: 'Electronics', icon: '⚡' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Home', icon: '🏠' }
  ]

  // filter
  let filtered = products.filter(function(product) {
    let matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    let matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // sort
  if (sortBy === 'low-to-high') {
    filtered.sort(function(a, b) { return a.price - b.price })
  } else if (sortBy === 'high-to-low') {
    filtered.sort(function(a, b) { return b.price - a.price })
  } else if (sortBy === 'rating') {
    filtered.sort(function(a, b) { return b.rating - a.rating })
  }

  function addToCart(product) {
    let exists = cart.find(function(item) { return item.id === product.id })
    if (exists) {
      setCart(cart.map(function(item) {
        if (item.id === product.id) return { ...item, qty: item.qty + 1 }
        return item
      }))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter(function(item) { return item.id !== id }))
  }

  let cartTotal = cart.reduce(function(sum, item) { return sum + item.price * item.qty }, 0)
  let cartCount = cart.reduce(function(sum, item) { return sum + item.qty }, 0)

  function renderStars(rating) {
    let full = Math.floor(rating)
    let stars = ''
    for (let i = 0; i < full; i++) stars += '★'
    for (let i = full; i < 5; i++) stars += '☆'
    return stars
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="store-header">
        <div className="header-inner">
          <h1>ShopZone</h1>
          <div className="cart-badge">
            🛒 <span className="badge-count">{cartCount}</span>
          </div>
        </div>
      </header>

      <div className="store-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={function(e) { setSearchTerm(e.target.value) }}
            />
          </div>

          <div className="sidebar-section">
            <h3>Categories</h3>
            {categories.map(function(cat) {
              return (
                <button
                  key={cat.name}
                  className={selectedCategory === cat.name ? 'sidebar-btn active' : 'sidebar-btn'}
                  onClick={function() { setSelectedCategory(cat.name) }}
                >
                  <span>{cat.icon}</span> {cat.name}
                </button>
              )
            })}
          </div>

          <div className="sidebar-section">
            <h3>Sort By</h3>
            <select value={sortBy} onChange={function(e) { setSortBy(e.target.value) }}>
              <option value="default">Default</option>
              <option value="low-to-high">Price: Low → High</option>
              <option value="high-to-low">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Mini Cart */}
          {cart.length > 0 && (
            <div className="sidebar-section mini-cart">
              <h3>Cart ({cartCount})</h3>
              {cart.map(function(item) {
                return (
                  <div key={item.id} className="cart-item">
                    <span>{item.emoji} {item.name} x{item.qty}</span>
                    <button onClick={function() { removeFromCart(item.id) }}>✕</button>
                  </div>
                )
              })}
              <div className="cart-total">Total: ₹{cartTotal}</div>
            </div>
          )}
        </aside>

        {/* Products */}
        <main className="products-area">
          <p className="results-info">
            Showing {filtered.length} of {products.length} products
            {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
          </p>

          <div className="product-grid">
            {filtered.map(function(product) {
              let inCart = cart.find(function(c) { return c.id === product.id })
              return (
                <div key={product.id} className="product-card">
                  <div className="product-visual">
                    <span className="product-emoji">{product.emoji}</span>
                    <span className="product-cat">{product.category}</span>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-rating">
                      <span className="stars">{renderStars(product.rating)}</span>
                      <span className="rating-num">{product.rating}</span>
                    </div>
                    <div className="product-bottom">
                      <span className="product-price">₹{product.price}</span>
                      <button
                        className={inCart ? 'add-btn in-cart' : 'add-btn'}
                        onClick={function() { addToCart(product) }}
                      >
                        {inCart ? '✓ Added' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="no-results">
              <span>🔍</span>
              <p>No products found. Try a different search or category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App