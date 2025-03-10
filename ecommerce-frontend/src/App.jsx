import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductListByCategory from './components/ProductListByCategory';
import Product from './pages/Product';
import Footer from './components/Footer';
import axios from 'axios';
import Cart from './pages/Cart';
import Contacts from './pages/Contacts';
import DeliveryInfo from './pages/DeliveryInfo';
import Success from './pages/Success';
import Cancelled from './pages/Cancelled';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import LoginPage from './pages/LogIn';
import MyOrders from './pages/MyOrders';
import SearchResultsPage from './pages/SearchResults';


axios.defaults.withCredentials = true; 
axios.defaults.baseURL = "http://localhost:8081/api";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const { pathname } = useLocation(); // Safe to use here inside Router context

  // Define routes where header and footer should be hidden
  const noHeaderFooterRoutes = ["/auth"];

  // Check if the current route matches a no-header-footer route
  const hideHeaderFooter = noHeaderFooterRoutes.includes(pathname);

  return (
    <div className="flex flex-col">
      {/* Conditional Rendering for Navbar and Categories */}
      {!hideHeaderFooter && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
      )}

      {!hideHeaderFooter && (
        <div className="pt-16"> {/* Adjust padding here based on the height of Navbar */}
          <Categories />
        </div>
      )}

      {/* Main content wrapper */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/by-category/:categoryName/:subcategory?" element={<ProductListByCategory />} />
          <Route path="/products/by-category/product/:categoryName?/:subcategory?/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/delivery" element={<DeliveryInfo />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancelled" element={<Cancelled />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/my-orders" element={<MyOrders/>}/>
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
      </div>

      {/* Conditional Rendering for Footer */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;