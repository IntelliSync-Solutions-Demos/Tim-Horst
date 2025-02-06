import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Phone, Calendar, User, Clock, ArrowRight, Share2 } from 'lucide-react';
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

// Blog post data (would typically come from CMS/Supabase)
const posts = [
  {
    id: 1,
    title: 'How to Choose the Right Windows for Your Home',
    category: 'windows',
    author: 'Tim Horst',
    date: 'March 15, 2024',
    readTime: '5 min read',
    excerpt: `A comprehensive guide to selecting energy-efficient windows that match your home's style and needs.`,
    content: `When it comes to choosing new windows for your home, there are several important factors to consider. Energy efficiency, style, and functionality all play crucial roles in making the right decision.

First, let's talk about energy efficiency. Modern windows come with various features that can significantly impact your home's energy consumption:

• Double or triple glazing
• Low-E glass coatings
• Gas-filled spaces between panes
• Insulated frames

Style is another crucial consideration. Your windows should complement your home's architecture while providing the functionality you need. Popular styles include:

• Double-hung windows
• Casement windows
• Sliding windows
• Bay windows

Remember to also consider:
1. Your climate zone
2. Window orientation
3. Local building codes
4. Budget constraints

Making the right choice can lead to significant energy savings and improved home comfort.`,
    image: 'https://images.unsplash.com/photo-1503708928676-1cb796a0891e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
    tags: ['Featured', 'Tips'],
  },
  {
    id: 2,
    title: 'The Benefits of Professional Window Installation',
    category: 'installation',
    author: 'Tim Horst',
    date: 'March 10, 2024',
    readTime: '4 min read',
    excerpt: `Why professional installation matters and how it can save you money in the long run.`,
    content: `Professional window installation is crucial for ensuring optimal performance and longevity of your new windows. Here's why it matters:

Key Benefits:
• Proper alignment and sealing
• Warranty protection
• Energy efficiency
• Professional finish

Common DIY Installation Mistakes:
1. Incorrect measurements
2. Poor insulation
3. Improper sealing
4. Uneven installation

Professional installation ensures that your investment is protected and performs as intended for years to come.`,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    tags: ['Tips', 'Professional Advice'],
  },
  {
    id: 3,
    title: 'Spring Home Maintenance Tips',
    category: 'maintenance',
    author: 'Tim Horst',
    date: 'March 5, 2024',
    readTime: '6 min read',
    excerpt: `Essential maintenance tasks to prepare your home for the spring season.`,
    content: `Spring is the perfect time to assess your home's condition and perform necessary maintenance. Here's your comprehensive spring maintenance checklist:

Windows and Doors:
• Clean tracks and mechanisms
• Check weatherstripping
• Inspect for damage
• Clean glass and screens

Exterior Maintenance:
1. Check siding condition
2. Clean gutters
3. Inspect roof
4. Test outdoor lighting

Regular maintenance helps prevent costly repairs and extends the life of your home's features.`,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
    tags: ['Seasonal', 'Tips'],
  },
  {
    id: 4,
    title: 'Energy Efficiency: Windows vs. Insulation',
    category: 'energy-efficiency',
    author: 'Tim Horst',
    date: 'March 1, 2024',
    readTime: '7 min read',
    excerpt: `Understanding the role of windows and insulation in your home's energy efficiency.`,
    content: `When it comes to energy efficiency, both windows and insulation play crucial roles. Let's explore how they work together:

Window Efficiency:
• U-factor ratings
• Solar heat gain coefficient
• Air leakage ratings
• Visible transmittance

Insulation Factors:
1. R-value
2. Installation quality
3. Material choice
4. Coverage areas

The key is finding the right balance between window upgrades and insulation improvements for optimal energy efficiency.`,
    image: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
    tags: ['Energy Efficiency', 'Education'],
  },
];

const categories = [
  { value: 'all', label: 'All Posts' },
  { value: 'windows', label: 'Windows' },
  { value: 'installation', label: 'Installation' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'energy-efficiency', label: 'Energy Efficiency' },
];

export function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Home renovation blog"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Home Renovation Tips & Insights
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Expert advice, project highlights, and the latest in home improvement from Tim Horst.
          </p>
        </div>
      </div>

      {/* Blog Feed */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Latest Articles
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Expert Insights & Tips
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
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

          {/* Blog Grid */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {filteredPosts.map((post) => (
              <Dialog key={post.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer overflow-hidden transition-all hover:shadow-lg">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="aspect-[16/9] w-full object-cover"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <CardTitle className="mt-4">{post.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button variant="ghost" className="ml-auto">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{post.title}</DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title} 
                      className="w-full rounded-lg object-cover max-h-[400px]"
                    />
                  </div>
                  <div className="mt-4 prose prose-blue max-w-none space-y-4">
                    {post.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Subscribe to our newsletter for the latest home improvement tips and insights.
            </p>
            <div className="mt-6 flex max-w-md mx-auto gap-x-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-auto"
              />
              <Button>
                Subscribe
              </Button>
            </div>
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
              Let's discuss your home improvement needs and create something amazing together.
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