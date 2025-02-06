import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, Phone, X, Moon, Sun, 
  Home, Info, Briefcase, Package, 
  FolderKanban, FileText, MessageCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Services', href: '/services', icon: Briefcase },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Our Work', href: '/portfolio', icon: FolderKanban },
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Contact', href: '/contact', icon: MessageCircle },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-background shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 text-2xl font-bold text-foreground">
            Tim Horst
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center space-x-2 text-sm font-semibold leading-6 text-foreground hover:text-blue-600"
              >
                <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Theme</span>
          </Button>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button asChild>
              <Link to="/quote" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Get a Quote
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <div
        className={cn(
          'lg:hidden',
          mobileMenuOpen
            ? 'fixed inset-0 z-50 bg-background px-6 py-6'
            : 'hidden'
        )}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="-m-1.5 p-1.5 text-2xl font-bold text-foreground">
            Tim Horst
          </Link>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle Theme</span>
            </Button>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="-mx-3 flex items-center space-x-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
            <div className="py-6">
              <Button
                asChild
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/quote" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Get a Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}