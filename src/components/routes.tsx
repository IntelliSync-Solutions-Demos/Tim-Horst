import Home from '../pages/home';
import { About } from '../pages/about';
import { Services } from '../pages/services';
import { Products } from '../pages/products';
import { Portfolio } from '../pages/portfolio';
import { Blog } from '../pages/blog';
import { Contact } from '../pages/contact';
import { Quote } from '../pages/quote';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, login, loginError } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(username, password);
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="admin-login-container">
        <form onSubmit={handleSubmit} className="admin-login-form">
          <h2>Admin Login</h2>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          {loginError && <p className="error-message text-red-500">{loginError}</p>}
          <button 
            type="submit" 
            className="admin-login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
};

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/products" element={<Products />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/quote" element={<Quote />} />
    </RouterRoutes>
  );
}