import { Link } from 'react-router-dom';
import logo from "../../../assets/801.png";

export default function SimpleHeader() {
  return (
    <header className="bg-white w-full">
      <div className="px-8 py-6">
        <Link to="/" className="inline-flex items-center">
          <img className="h-12 w-auto" src={logo} alt="logo" />
        </Link>
      </div>
    </header>
  );
}
