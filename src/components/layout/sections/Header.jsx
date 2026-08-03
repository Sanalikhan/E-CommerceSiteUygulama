import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../assets/801.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#650404] w-full text-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-10 sm:px-8 lg:px-10">
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

        <nav className={`absolute inset-x-0 top-full z-20 bg-[#650404] px-5 pb-5 transition-all duration-300 sm:static sm:block sm:w-auto sm:px-0 ${menuOpen ? 'block' : 'hidden'}`} >
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
