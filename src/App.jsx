import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import CustomizedSolutionsPage from './pages/CustomizedSolutionsPage';
import ServicesPage from './pages/ServicesPage';
import FaqsPage from './pages/FaqsPage';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import OrdersPage from './pages/OrdersPage';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/layout/sections/Header';
import Footer from './components/layout/sections/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-white">
        <Header />
        <main className="pt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/customized-solutions" element={<CustomizedSolutionsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
