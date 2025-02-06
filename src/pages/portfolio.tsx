import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Phone, Star, Calendar, MapPin, ArrowRight } from 'lucide-react';
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

// Project data (would typically come from CMS/Supabase)
const projects = [
  {
    id: 1,
    title: 'Modern Window Installation',
    category: 'windows',
    status: 'Completed',
    description: 'Complete replacement of old windows with energy-efficient models.',
    location: 'Chatham',
    date: 'March 2024',
    images: {
      before: 'https://images.unsplash.com/photo-1503708928676-1cb796a0891e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
      after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
    details: [
      'Replaced 12 windows throughout the home',
      'Installed energy-efficient double-glazed windows',
      'Added custom trim work',
      'Improved home insulation and comfort',
    ],
    testimonial: {
      content: 'Tim did an amazing job with our windows. The difference in our home comfort is remarkable.',
      author: 'Sarah Johnson',
      rating: 5,
    },
  },
  {
    id: 2,
    title: 'Custom Entry Door Installation',
    category: 'doors',
    status: 'Completed',
    description: 'Installation of a premium entry door with custom sidelights.',
    location: 'Blenheim',
    date: 'February 2024',
    images: {
      before: 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
      after: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
    },
    details: [
      'Custom-sized entry door installation',
      'Added decorative sidelights',
      'Enhanced security features',
      'Improved curb appeal',
    ],
    testimonial: {
      content: 'The new door has transformed the look of our home. Professional installation and great attention to detail.',
      author: 'Mike Thompson',
      rating: 5,
    },
  },
  {
    id: 3,
    title: 'Complete Home Exterior Renovation',
    category: 'exterior',
    status: 'Completed',
    description: 'Full exterior renovation including siding, windows, and trim.',
    location: 'Ridgetown',
    date: 'January 2024',
    images: {
      before: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
      after: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
    },
    details: [
      'New vinyl siding installation',
      'Window replacements',
      'Custom trim work',
      'Updated exterior lighting',
    ],
    testimonial: {
      content: 'Tim and his team completely transformed our home. The attention to detail was impressive.',
      author: 'David Wilson',
      rating: 5,
    },
  },
  {
    id: 4,
    title: 'Interior Trim & Finishing',
    category: 'interior',
    status: 'Completed',
    description: 'Custom crown molding and baseboards throughout the home.',
    location: 'Chatham',
    date: 'December 2023',
    images: {
      before: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
      after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
    details: [
      'Custom crown molding installation',
      'New baseboards throughout',
      'Window and door trim',
      'Paint touch-ups and finishing',
    ],
    testimonial: {
      content: 'The trim work has added such elegance to our home. Excellent craftsmanship.',
      author: 'Emily Brown',
      rating: 5,
    },
  },
];

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'windows', label: 'Windows' },
  { value: 'doors', label: 'Doors' },
  { value: 'exterior', label: 'Exterior Renovations' },
  { value: 'interior', label: 'Interior Finishing' },
];

export function Portfolio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Home renovation project"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            See Our Work
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            From concept to completion, explore our latest projects and the transformations we create.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" variant="secondary">
              <a href="#projects">View Projects</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Project Gallery */}
      <div id="projects" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Our Portfolio
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Recent Projects
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Browse through our completed projects and see the quality of our work firsthand.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
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

          {/* Project Grid */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {filteredProjects.map((project) => (
              <Dialog key={project.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer overflow-hidden transition-all hover:shadow-lg">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={project.images.after}
                          alt={project.title}
                          className="aspect-[16/9] w-full object-cover"
                        />
                        <Badge
                          variant="secondary"
                          className="absolute top-4 right-4"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {project.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {project.location}
                        </div>
                      </div>
                      <CardTitle className="mt-4">{project.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {project.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button variant="ghost" className="ml-auto">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Before</h4>
                        <img
                          src={project.images.before}
                          alt="Before"
                          className="rounded-lg"
                        />
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">After</h4>
                        <img
                          src={project.images.after}
                          alt="After"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium">Project Details</h4>
                      <ul className="mt-2 space-y-2">
                        {project.details.map((detail, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                      <div className="flex justify-center">
                        {[...Array(project.testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 text-yellow-400"
                            fill="currentColor"
                          />
                        ))}
                      </div>
                      <p className="mt-4 text-center text-gray-600">
                        "{project.testimonial.content}"
                      </p>
                      <p className="mt-2 text-center font-medium">
                        {project.testimonial.author}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button asChild>
                      <Link to="/quote">Get a Quote for a Similar Project</Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Home?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
              Let's discuss your project and create something amazing together.
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