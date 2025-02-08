import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { ProductsUploadModal } from "@/components/admin/products-upload-modal";
import { PortfolioUploadModal } from "@/components/admin/portfolio-upload-modal";

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

        {/* Admin Upload Buttons */}
        <div className="fixed bottom-4 right-4 flex space-x-4">
          <div className="bg-blue-500 rounded-md p-1">
            <ProductsUploadModal />
          </div>
          <div className="bg-green-500 rounded-md p-1">
            <PortfolioUploadModal />
          </div>
        </div>
      </div>
    </footer>
  );
}