import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone, Lock } from 'lucide-react';
import { ProductsUploadModal } from "@/components/admin/products-upload-modal";
import { PortfolioUploadModal } from "@/components/admin/portfolio-upload-modal";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Our Work', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
    {
      name: 'X (Twitter)',
      href: '#',
      icon: Twitter,
    },
  ],
};

export function Footer() {
  const { isAdmin, adminUsername, login, logout, loginError } = useAuth();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminSignIn = () => {
    setShowAdminModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        setShowAdminModal(false);
      }
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              Tim Horst
            </Link>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              40+ years of experience in window installations and home renovations.
              Serving Chatham-Kent with quality craftsmanship and dedication.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              Contact Us
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <a
                  href="tel:+15555555555"
                  className="text-sm leading-6 text-gray-600 hover:text-blue-600 flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  (555) 555-5555
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@timhorst.com"
                  className="text-sm leading-6 text-gray-600 hover:text-blue-600 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  info@timhorst.com
                </a>
              </li>
              <li>
                <div className="text-sm leading-6 text-gray-600 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Chatham-Kent, Ontario
                </div>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              Quick Links
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm leading-6 text-gray-600 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {/* Admin Signin Link */}
              <li>
                <button 
                  onClick={handleAdminSignIn}
                  className="text-sm leading-6 text-gray-600 hover:text-blue-600 flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Admin Signin
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>

        {/* Footer Text */}
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} Tim Horst. All rights reserved.
        </p>

        {/* Admin Upload Buttons - Only visible when fully signed in */}
        {isAdmin && adminUsername && (
          <div className="fixed bottom-4 right-4 flex space-x-4">
            <div className="bg-blue-600 rounded-md">
              <ProductsUploadModal />
            </div>
            <div className="bg-green-600 rounded-md">
              <PortfolioUploadModal />
            </div>
            <Button 
              onClick={logout} 
              variant="destructive" 
              size="sm"
            >
              Logout
            </Button>
          </div>
        )}

        {/* Admin Modal */}
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-black">Admin Signin</h2>
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder="Enter admin username" 
                  className="w-full px-3 py-2 border rounded-md text-black placeholder-gray-600"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
                <input 
                  type="password" 
                  placeholder="Enter admin password" 
                  className="w-full px-3 py-2 border rounded-md mt-4 text-black placeholder-gray-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                {loginError && (
                  <p className="text-red-500 mt-2">{loginError}</p>
                )}
                <div className="flex space-x-2 mt-4">
                  <button 
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowAdminModal(false)}
                    className="w-full bg-secondary text-secondary-foreground py-2 rounded-md hover:bg-secondary/80"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}