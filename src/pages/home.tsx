import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    name: '40+ Years Experience',
    description:
      'Decades of expertise in window installations and home renovations.',
  },
  {
    name: 'Quality Craftsmanship',
    description:
      'Attention to detail and superior workmanship in every project.',
  },
  {
    name: 'Local Service',
    description:
      'Proudly serving the Chatham-Kent community with personalized care.',
  },
  {
    name: 'Customer Satisfaction',
    description:
      'Building lasting relationships through exceptional service and results.',
  },
];

const testimonials = [
  {
    content:
      'Tim did an amazing job installing our new windows. His attention to detail and professionalism were outstanding.',
    author: 'Sarah Johnson',
    rating: 5,
  },
  {
    content:
      "We were impressed by Tim's expertise and the quality of his work. He transformed our home with beautiful new windows.",
    author: 'Mike Thompson',
    rating: 5,
  },
  {
    content:
      'Professional, reliable, and excellent craftsmanship. Highly recommend Tim for any window installation needs.',
    author: 'David Wilson',
    rating: 5,
  },
];

export function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                Quality Window Installations & Home Renovations
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                With over 40 years of experience, Tim Horst delivers exceptional
                craftsmanship and reliable service to homeowners in Chatham-Kent.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button asChild size="lg">
                  <Link to="/quote">Get a Free Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/portfolio" className="flex items-center gap-2">
                    View Our Work
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <img
              className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:p-6 xl:p-8"
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Home renovation project"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Why Choose Tim Horst
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Experience the Difference
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Delivering quality craftsmanship and exceptional service to every
            project, big or small.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <CheckCircle2
                    className="h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Clients Say
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-center sm:mt-20 lg:mt-24 lg:max-w-none lg:grid-cols-3">
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Transform Your Home?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
            Contact us today for a free consultation and quote. Let's bring your
            vision to life with quality craftsmanship and exceptional service.
          </p>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/quote">Get Your Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-32 sm:mt-40" />
    </div>
  );
}