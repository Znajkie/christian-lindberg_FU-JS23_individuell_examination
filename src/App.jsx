import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataFetcher from './modules/API/DataFetcher';
import LandingPage from './modules/Landing/Landing';
import About from './pages/About'
import NavMenu from './pages/NavMenu';
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Profile from './pages/profile'
import Orderstatus from './pages/OrderStatus'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/navmenu" element={<NavMenu />} />
        <Route path="/datafetcher" element={<DataFetcher />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orderstatus" element={<Orderstatus />} />
      </Routes>
    </Router>
  );
}

export default App;
