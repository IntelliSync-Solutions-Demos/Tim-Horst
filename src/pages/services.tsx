import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppWindow as Window, DoorOpen, Home, PaintBucket, Hammer, Wrench, ChevronDown, ChevronUp, MapPin, Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';


const services = [
  {
    icon: Window,
    name: 'Window Installation & Replacement',
    description:
      "Expert installation of energy-efficient windows to enhance your home's comfort and curb appeal.",
    details: [
      'Energy-efficient window options',
      'Professional installation by experienced craftsmen',
      'Custom sizing and styles available',
      'Warranty-backed installations',
    ],
    image:
      'https://images.unsplash.com/photo-1503708928676-1cb796a0891e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
  },
  {
    icon: DoorOpen,
    name: 'Door Installation',
    description:
      'Beautiful, secure doors installed with precision to welcome you home.',
    details: [
      'Entry doors, patio doors, and storm doors',
      'Security-focused installation',
      'Wide selection of styles and materials',
      'Professional fitting and finishing',
    ],
    image:
      'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
  },
  {
    icon: Home,
    name: 'Custom Home Renovations',
    description:
      'Transform your living space with custom renovations tailored to your needs.',
    details: [
      'Kitchen and bathroom renovations',
      'Basement finishing',
      'Room additions and expansions',
      'Custom carpentry and built-ins',
    ],
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
  },
  {
    icon: PaintBucket,
    name: 'Exterior Upgrades',
    description:
      "Enhance your home's exterior with quality siding, fascia, and gutter installations.",
    details: [
      'Siding installation and repair',
      'Fascia and soffit replacement',
      'Gutter installation and maintenance',
      'Exterior trim work',
    ],
    image:
      'https://images.unsplash.com/photo-1604079628040-94301bb21b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
  },
  {
    icon: Hammer,
    name: 'Interior Finishing & Trim',
    description:
      'Add the perfect finishing touches to your home with expert trim work.',
    details: [
      'Crown molding installation',
      'Baseboards and door casings',
      'Window trim and sills',
      'Custom millwork',
    ],
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
  },
  {
    icon: Wrench,
    name: 'Small Home Repairs',
    description:
      'Professional repairs and maintenance to keep your home in perfect condition.',
    details: [
      'Window and door repairs',
      'Weather stripping and sealing',
      'Hardware replacement',
      'General maintenance',
    ],
    image:
      'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
];

const testimonials = [
  {
    content:
      'Tim did an amazing job with our window installation. His attention to detail and professionalism were outstanding.',
    author: 'Sarah Johnson',
    location: 'Chatham',
    rating: 5,
  },
  {
    content:
      'The quality of work on our home renovation was exceptional. Tim and his team were professional and reliable throughout the project.',
    author: 'Mike Thompson',
    location: 'Blenheim',
    rating: 5,
  },
];

const serviceAreas = [
  'Chatham',
  'Blenheim',
  'Ridgetown',
  'Tilbury',
  'Wallaceburg',
  'Dresden',
  'Thamesville',
  'Wheatley',
];

export function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <img
          src="https://images.unsplash.com/photo-1503708928676-1cb796a0891e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80"
          alt="Window installation"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Expert Window Installation & Home Renovation Services
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            40+ years of trusted craftsmanship, serving your home renovation needs
            with quality and care in Chatham-Kent.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" variant="secondary">
              <Link to="/quote">Request a Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Our Services
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Home Improvement Solutions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From window installations to complete home renovations, we provide
            expert craftsmanship for all your home improvement needs.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col items-start"
            >
              <div className="rounded-2xl bg-gray-50 p-8 w-full">
                <service.icon
                  className="h-8 w-8 text-blue-600"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {service.name}
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  {service.description}
                </p>
                <Button
                  variant="ghost"
                  className="mt-4"
                  onClick={() =>
                    setExpandedService(
                      expandedService === service.name ? null : service.name
                    )
                  }
                >
                  {expandedService === service.name ? (
                    <ChevronUp className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  )}
                  {expandedService === service.name
                    ? 'Show Less'
                    : 'Learn More'}
                </Button>
                {expandedService === service.name && (
                  <div className="mt-4">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="rounded-lg mb-4"
                    />
                    <ul className="space-y-2">
                      {service.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <div className="mt-1 flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-blue-600" />
                          </div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Areas */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Service Areas
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Serving Chatham-Kent & Surrounding Areas
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {serviceAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-x-2 text-sm text-gray-600"
                >
                  <MapPin className="h-4 w-4 text-blue-600" />
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Clients Say
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-center sm:mt-20 lg:mt-24 lg:max-w-none lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 rounded-2xl bg-gray-50 px-6 py-8"
              >
                <div className="flex justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-lg leading-8 text-gray-600">
                  "{testimonial.content}"
                </p>
                <div className="mt-auto">
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
              Contact us today for a free consultation and quote. Let's bring your
              vision to life with quality craftsmanship and exceptional service.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Button asChild size="lg">
                <Link to="/quote">Get Your Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+15555555555" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}