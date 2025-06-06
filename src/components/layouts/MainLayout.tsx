import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Package, Map, MessageSquare, UserCircle, Home, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const MainLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
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

  const handleLogout = () => {
    logout();
  };

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
          <div className="hidden items-center gap-4 md:flex">
            <Link to="/profile" className="flex items-center gap-2">
              <img
                src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=3'}
                alt={currentUser?.name || 'User'}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium">{currentUser?.name || 'User'}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              title="Se déconnecter"
            >
              <LogOut size={16} />
            </button>
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
                <li className="pt-4 border-t">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition hover:bg-gray-50"
                  >
                    <LogOut size={20} />
                    Se déconnecter
                  </button>
                </li>
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
    </div>
  );
};

export default MainLayout;