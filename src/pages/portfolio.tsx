import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Phone, Star, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PortfolioUploadModal } from '@/components/admin/portfolio-upload-modal';

// Define the type for portfolio projects
type PortfolioProject = {
  id: number;
  title: string;
  category: string;
  status: string;
  description: string;
  location: string;
  date: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  details: string[];
  testimonial: {
    content: string;
    author: string;
    rating: number;
  };
};

export function Portfolio() {
  // State to store portfolio projects
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<PortfolioProject[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/portfolio');
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        const responseText = await response.text(); // Get raw text first
        console.log('Raw response:', responseText);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio projects. Status: ${response.status}, Response: ${responseText}`);
        }
        
        // Try parsing JSON
        const projects: PortfolioProject[] = JSON.parse(responseText);
        
        setPortfolioProjects(projects);
        setFilteredProjects(projects);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching portfolio projects:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects by category
  useEffect(() => {
    const filtered = selectedCategory === 'all' 
      ? portfolioProjects 
      : portfolioProjects.filter(project => project.category === selectedCategory);
    
    setFilteredProjects(filtered);
  }, [selectedCategory, portfolioProjects]);

  // Filter projects by search query
  useEffect(() => {
    const filtered = portfolioProjects.filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredProjects(filtered);
  }, [searchQuery, portfolioProjects]);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'windows', label: 'Windows' },
    { value: 'doors', label: 'Doors' },
    { value: 'exterior', label: 'Exterior Renovations' },
    { value: 'interior', label: 'Interior Finishing' },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

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
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Project Grid */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">No projects found</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div key={project.id} className="cursor-pointer overflow-hidden transition-all hover:shadow-lg">
                  <Card className="overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={project.afterImageUrl}
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
                  <div className="max-w-3xl">
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">Before</h4>
                          <img
                            src={project.beforeImageUrl}
                            alt="Before"
                            className="rounded-lg"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 text-sm font-medium">After</h4>
                          <img
                            src={project.afterImageUrl}
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
                  </div>
                </div>
              ))
            )}
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

      {/* Admin Upload Section */}
      <div className="container mx-auto px-4 py-8">
        <PortfolioUploadModal />
      </div>
    </div>
  );
}