import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Phone, Star, Shield, Zap, Ruler, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Project images for carousel
const projectImages = [
  {
    id: 1,
    title: 'Modern Window Installation',
    description: 'Energy-efficient window replacement project in Chatham',
    image: 'https://images.unsplash.com/photo-1503708928676-1cb796a0891e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
  },
  {
    id: 2,
    title: 'Custom Entry Door',
    description: 'Beautiful custom entry door installation',
    image: 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
  },
  {
    id: 3,
    title: 'Home Exterior Renovation',
    description: 'Complete exterior transformation project',
    image: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
  },
  {
    id: 4,
    title: 'Sliding Patio Doors',
    description: 'Modern sliding door installation',
    image: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
  },
  {
    id: 5,
    title: 'Interior Finishing',
    description: 'Custom crown molding and trim work',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
  },
  {
    id: 6,
    title: 'Premium Hardware',
    description: 'High-quality door hardware installation',
    image: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
];

// Product data (would typically come from CMS/Supabase)
const products = [
  {
    id: 1,
    name: 'Premium Double-Glazed Windows',
    brand: 'EnergyGuard Pro',
    category: 'windows',
    description: 'High-performance double-glazed windows with superior insulation.',
    image: 'https://images.unsplash.com/photo-1503708928676-1cb796a0891e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
    features: [
      'Double-glazed for maximum insulation',
      'UV protection coating',
      'Custom sizes available',
      'Energy Star certified',
    ],
    tags: ['Featured', 'Best Seller'],
    rating: 5,
    reviews: 24,
  },
  {
    id: 2,
    name: 'Classic Entry Door Collection',
    brand: 'SecureHome',
    category: 'doors',
    description: 'Elegant and secure entry doors with modern locking systems.',
    image: 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
    features: [
      'Multi-point locking system',
      'Weather-resistant finish',
      'Energy-efficient design',
      'Various styles available',
    ],
    tags: ['New Arrival'],
    rating: 5,
    reviews: 18,
  },
  {
    id: 3,
    name: 'Premium Vinyl Siding',
    brand: 'DuraTech',
    category: 'siding',
    description: 'Long-lasting vinyl siding with superior weather resistance.',
    image: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
    features: [
      'Lifetime warranty',
      'Low maintenance',
      'Wide color selection',
      'Professional installation',
    ],
    tags: ['Popular'],
    rating: 4,
    reviews: 15,
  },
  {
    id: 4,
    name: 'Sliding Patio Doors',
    brand: 'ViewMax',
    category: 'doors',
    description: 'Modern sliding doors with smooth operation and great views.',
    image: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
    features: [
      'Smooth gliding system',
      'Security features',
      'Energy-efficient glass',
      'Screen included',
    ],
    tags: ['Featured'],
    rating: 5,
    reviews: 12,
  },
  {
    id: 5,
    name: 'Crown Molding Collection',
    brand: 'FineCraft',
    category: 'interior',
    description: 'Elegant crown molding for sophisticated interior finishing.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
    features: [
      'Premium materials',
      'Various styles',
      'Easy installation',
      'Paint-ready finish',
    ],
    tags: [],
    rating: 4,
    reviews: 8,
  },
  {
    id: 6,
    name: 'Premium Door Hardware',
    brand: 'SecureLock',
    category: 'hardware',
    description: 'High-quality door handles and locks for enhanced security.',
    image: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    features: [
      'Durable construction',
      'Modern designs',
      'Easy installation',
      'Various finishes',
    ],
    tags: ['New Arrival'],
    rating: 5,
    reviews: 6,
  },
];

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'windows', label: 'Windows' },
  { value: 'doors', label: 'Doors' },
  { value: 'siding', label: 'Siding & Exterior' },
  { value: 'interior', label: 'Interior Finishing' },
  { value: 'hardware', label: 'Hardware & Accessories' },
];

const testimonials = [
  {
    content: "The windows Tim installed are fantastic. They've made a huge difference in our home's comfort and energy bills.",
    author: 'Sarah Johnson',
    location: 'Chatham',
    rating: 5,
  },
  {
    content: 'High-quality products and expert installation. Our new doors look amazing and function perfectly.',
    author: 'Mike Thompson',
    location: 'Blenheim',
    rating: 5,
  },
];

export function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <img
          src="https://images.unsplash.com/photo-1503708928676-1cb796a0891e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80"
          alt="Premium windows and doors"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            High-Quality Windows, Doors & Renovation Materials
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Only the best materials for durability, efficiency, and beauty in every installation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" variant="secondary">
              <a href="#products">Browse Our Products</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Project Carousel */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Our Work
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Recent Projects
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Browse through our latest installations and renovations to see the quality of our work.
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto mt-16 px-4"
          >
            <CarouselContent>
              {projectImages.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg">
                        <CardContent className="p-0">
                          <div className="relative group">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                              <h3 className="text-white font-semibold">{project.title}</h3>
                              <p className="text-gray-200 text-sm">{project.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{project.title}</DialogTitle>
                        <DialogDescription>{project.description}</DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full rounded-lg"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Product Features */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Why Choose Our Products
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Quality You Can Trust
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-blue-600" />
              <dt className="mt-4 font-semibold text-gray-900">Premium Quality</dt>
              <dd className="mt-2 text-sm text-gray-600">
                Top-tier materials and products from trusted manufacturers
              </dd>
            </div>
            <div className="flex flex-col items-center text-center">
              <Zap className="h-12 w-12 text-blue-600" />
              <dt className="mt-4 font-semibold text-gray-900">Energy Efficient</dt>
              <dd className="mt-2 text-sm text-gray-600">
                Products designed for optimal energy performance
              </dd>
            </div>
            <div className="flex flex-col items-center text-center">
              <Ruler className="h-12 w-12 text-blue-600" />
              <dt className="mt-4 font-semibold text-gray-900">Custom Sizes</dt>
              <dd className="mt-2 text-sm text-gray-600">
                Perfect fit for your specific requirements
              </dd>
            </div>
            <div className="flex flex-col items-center text-center">
              <Palette className="h-12 w-12 text-blue-600" />
              <dt className="mt-4 font-semibold text-gray-900">Style Options</dt>
              <dd className="mt-2 text-sm text-gray-600">
                Wide selection of designs and finishes
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Product Catalog */}
      <div id="products" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Our Products
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Browse Our Selection
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    {product.tags.length > 0 && (
                      <div className="absolute top-4 left-4 flex gap-2">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{product.brand}</span>
                  </div>
                  <CardTitle className="mt-4">{product.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {product.description}
                  </CardDescription>
                  <ul className="mt-4 space-y-2">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <Link to="/quote" className="flex items-center justify-center gap-2">
                      Request Quote
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
              Need Help Choosing the Right Product?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
              Contact us today for expert advice and a free consultation. We'll help you find the perfect solution for your home.
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