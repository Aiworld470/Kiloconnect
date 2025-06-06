import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Package className={isScrolled ? 'text-primary-500' : 'text-white'} size={28} />
          <span className={`text-xl font-bold ${isScrolled ? '' : 'text-white'}`}>
            <span className="text-primary-500">Kilo</span>
            <span className={isScrolled ? 'text-secondary-500' : 'text-white'}>Connect</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ul className={`flex items-center space-x-8 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            <li>
              <a href="#" className={`transition hover:text-primary-400 ${isScrolled ? '' : 'text-white'}`}>Fonctionnement</a>
            </li>
            <li>
              <a href="#" className={`transition hover:text-primary-400 ${isScrolled ? '' : 'text-white'}`}>Destinations</a>
            </li>
            <li>
              <a href="#" className={`transition hover:text-primary-400 ${isScrolled ? '' : 'text-white'}`}>Témoignages</a>
            </li>
            <li>
              <a href="#" className={`transition hover:text-primary-400 ${isScrolled ? '' : 'text-white'}`}>À propos</a>
            </li>
            <li>
              <a href="#" className={`transition hover:text-primary-400 ${isScrolled ? '' : 'text-white'}`}>Contact</a>
            </li>
          </ul>
        </nav>

        {/* Action buttons */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {currentUser ? (
            <Link 
              to="/dashboard" 
              className={`btn ${
                isScrolled 
                  ? 'btn-primary' 
                  : 'border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary-500'
              }`}
            >
              Tableau de bord
            </Link>
          ) : (
            <>
              <Link 
                to="/auth" 
                className={`btn ${
                  isScrolled 
                    ? 'bg-white text-gray-800 hover:bg-gray-100' 
                    : 'border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary-500'
                }`}
              >
                Connexion
              </Link>
              <Link 
                to="/auth?register=true" 
                className={`btn ${isScrolled ? 'btn-primary' : 'bg-primary-500 text-white hover:bg-primary-600'}`}
              >
                Inscription
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 md:hidden">
          <div className="h-full w-64 animate-slide-down bg-white p-5 shadow-lg">
            <div className="mb-6 flex items-center gap-2">
              <Package className="text-primary-500" size={28} />
              <span className="text-xl font-bold">
                <span className="text-primary-500">Kilo</span>
                <span className="text-secondary-500">Connect</span>
              </span>
            </div>
            <nav>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="block py-2">Fonctionnement</a>
                </li>
                <li>
                  <a href="#" className="block py-2">Destinations</a>
                </li>
                <li>
                  <a href="#" className="block py-2">Témoignages</a>
                </li>
                <li>
                  <a href="#" className="block py-2">À propos</a>
                </li>
                <li>
                  <a href="#" className="block py-2">Contact</a>
                </li>
                <li className="pt-4">
                  {currentUser ? (
                    <Link 
                      to="/dashboard" 
                      className="btn-primary w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Tableau de bord
                    </Link>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Link 
                        to="/auth" 
                        className="btn w-full border border-gray-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Connexion
                      </Link>
                      <Link 
                        to="/auth?register=true" 
                        className="btn-primary w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Inscription
                      </Link>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;