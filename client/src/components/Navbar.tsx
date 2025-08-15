import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useDispatch } from 'react-redux';
import { Search, Menu, X } from 'lucide-react';
import { AppDispatch } from '../store/store';
import { searchMovies, clearSearch } from '../store/slices/moviesSlice';

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const navLinks = [
    { path: '/', label: 'Home', id: 'home' },
    { path: '/top-rated', label: 'Top Rated', id: 'top-rated' },
    { path: '/upcoming', label: 'Upcoming', id: 'upcoming' },
  ];

  const isActiveLink = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      dispatch(searchMovies({ query: searchQuery.trim(), page: 1 }));
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim().length === 0) {
      dispatch(clearSearch());
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-cinema-gray border-b border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={() => setLocation('/')}
                className="text-2xl font-bold text-cinema-blue hover:text-blue-400 transition-colors"
                data-testid="logo"
              >
                CineHub
              </button>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => setLocation(link.path)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActiveLink(link.path)
                        ? 'text-white bg-cinema-blue'
                        : 'text-gray-300 hover:text-cinema-blue'
                    }`}
                    data-testid={`nav-link-${link.id}`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search movies..."
                className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cinema-blue focus:ring-1 focus:ring-cinema-blue"
                data-testid="search-input"
              />
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setLocation(link.path)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActiveLink(link.path)
                      ? 'text-white bg-cinema-blue'
                      : 'text-gray-300 hover:text-cinema-blue hover:bg-gray-700'
                  }`}
                  data-testid={`mobile-nav-link-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}