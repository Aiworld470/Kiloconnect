import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Package, Map, MessageSquare, UserCircle, Home, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const MainLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { path: '/dashboard', label: 'Tableau de bord', icon: <Home size={20} /> },
    { path: '/search', label: 'Rechercher', icon: <Map size={20} /> },
    { path: '/chat', label: 'Messages', icon: <MessageSquare size={20} /> },
    { path: '/profile', label: 'Profil', icon: <UserCircle size={20} /> },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-white py-4 shadow-sm">
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Package className="text-primary-500" size={28} />
            <span className="text-xl font-bold">
              <span className="text-primary-500">Kilo</span>
              <span className="text-secondary-500">Connect</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`flex items-center gap-1.5 text-sm font-medium transition hover:text-primary-500 ${
                      location.pathname === item.path ? 'text-primary-500' : 'text-gray-700'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="hidden items-center md:flex">
            <Link to="/profile" className="flex items-center gap-2">
              <img
                src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=3'}
                alt={currentUser?.name || 'User'}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium">{currentUser?.name || 'User'}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="text-gray-700 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

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
            <div className="mb-6 flex items-center gap-3 border-b pb-4">
              <img
                src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=3'}
                alt={currentUser?.name || 'User'}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{currentUser?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{currentUser?.email || 'user@example.com'}</p>
              </div>
            </div>
            <nav>
              <ul className="space-y-4">
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
                        location.pathname === item.path
                          ? 'bg-primary-50 text-primary-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow">
        <div className="container py-6">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-gray-300">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <Package className="text-primary-500" size={24} />
                <span className="text-xl font-bold">
                  <span className="text-primary-500">Kilo</span>
                  <span className="text-secondary-500">Connect</span>
                </span>
              </div>
              <p className="mt-4 text-sm">
                Connectez la diaspora et facilitez le transport de colis à travers le monde.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Liens Rapides</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-primary-500">Accueil</Link>
                </li>
                <li>
                  <Link to="/search" className="hover:text-primary-500">Rechercher un trajet</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-primary-500">Mon compte</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Contact</h4>
              <p className="text-sm">support@kiloconnect.com</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} KiloConnect. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;