import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataFetcher from './modules/API/DataFetcher';
import LandingPage from './pages/landing/Landing';
import About from './pages/about/About';
import NavMenu from './modules/navMenu/NavMenu';
import Cart from './modules/cart/Cart';
import Checkout from './pages/delivery/Delivery';
import Profile from './pages/profile/profile';
import Orderstatus from './pages/orderStatus/OrderStatus';
import HandleSignUp from './modules/handleSignUp/HandleSignUp';
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
        <Route path="/signup" element={<HandleSignUp />} />
        <Route path="/orderstatus" element={<Orderstatus />} />
      </Routes>
    </Router>
  );
}

export default App;
