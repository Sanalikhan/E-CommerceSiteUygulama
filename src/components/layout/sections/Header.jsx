import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../../features/AuthSlice';
import logo from "../../../assets/801.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [menuRef]);
  


  return (
    <header className="bg-[#650404] w-full text-white">
      <div className="mx-auto flex max-w-350 items-center justify-between px-5 py-10 sm:px-8 lg:px-10">
        <div className="flex items-center">
          <img className="h-10 w-auto sm:h-12" src={logo} alt="logo" />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="sm:hidden rounded-full border border-white/20 bg-white/10 px-3 py-2 text-white"
          aria-expanded={menuOpen}
        >
          Menu
        </button>

        <nav ref={menuRef} className={`absolute inset-x-0 top-full z-20 bg-[#650404] px-5 pb-5 transition-all duration-300 sm:static sm:block sm:w-auto sm:px-0 ${menuOpen ? 'block' : 'hidden'}`} >
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 lg:gap-8">
            <ul className="flex flex-col gap-3 text-[12px] font-nunito sm:flex-row sm:items-center sm:gap-6 lg:gap-8">
            <li>
              <Link to="/about" className="block text-white transition hover:text-[#FFD18F]" onClick={() => setMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block text-white transition hover:text-[#FFD18F]" onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/products" className="block text-white transition hover:text-[#FFD18F]" onClick={() => setMenuOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/customized-solutions" className="block text-white transition hover:text-[#FFD18F]" onClick={() => setMenuOpen(false)}>
                Customized Solutions
              </Link>
            </li>
            <li>
              <Link to="/services" className="block text-white transition hover:text-[#FFD18F]" onClick={() => setMenuOpen(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="block text-white transition hover:text-[#FFD18F]" onClick={() => setMenuOpen(false)}>
                FAQs
              </Link>
            </li>
            </ul>

            <div className="mt-3 sm:mt-0 sm:ml-6 sm:ml-auto">
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    className="flex items-center rounded-full border border-white/20 bg-white/10 p-0.5"
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                  >
                    {user.picture ? (
                      <img src={user.picture} alt={user.name || user.email} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <svg className="h-10 w-10 text-white p-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.2" />
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="white" fillOpacity="0.9" />
                        <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4v-1z" fill="white" fillOpacity="0.9" />
                      </svg>
                    )}
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded bg-white text-black shadow-lg">
                      <Link to="/orders" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-100">My Orders</Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                      )}
                      <button
                        type="button"
                        onClick={() => { dispatch(clearUser()); setMenuOpen(false); navigate('/'); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-3 items-center">
                  <Link to="/signin" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-white">Sign In</Link>
                  <Link to="/register" className="rounded-full border border-white/20 bg-[#FFA920] px-3 py-2 text-white">Register</Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
