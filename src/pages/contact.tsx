import { useState, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Phone, Mail, MapPin, Facebook, Instagram, 
  Linkedin, Twitter, Navigation 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  GoogleMap, 
  useLoadScript, 
  Marker 
} from '@react-google-maps/api';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const socialLinks = [
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
];

// Chatham, Ontario coordinates
const CHATHAM_COORDINATES = {
  lat: 42.4024,
  lng: -82.1860
};

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // Here we would typically send the data to Supabase
      console.log('Form data:', data);
      
      toast({
        title: 'Message Sent!',
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch  {
      toast({
        title: 'Error',
        description: 'There was a problem sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const renderMap = useCallback(() => {
    if (loadError) {
      return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <GoogleMap
        mapContainerClassName="w-full h-96 rounded-lg shadow-lg"
        center={CHATHAM_COORDINATES}
        zoom={12}
      >
        <Marker 
          position={CHATHAM_COORDINATES} 
          title="Tim Horst Services"
        />
      </GoogleMap>
    );
  }, [isLoaded, loadError]);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Contact Tim Horst"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Let's Talk About Your Next Home Renovation Project
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Contact Tim today for expert window installation and home renovation services in Chatham-Kent.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Get in Touch</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ready to start your project? Have questions about our services? We're here to help.
            </p>

            <dl className="mt-8 space-y-6">
              <div className="flex gap-x-4">
                <dt>
                  <Phone className="h-7 w-6 text-muted-foreground" aria-hidden="true" />
                </dt>
                <dd>
                  <p className="text-sm font-semibold text-foreground">Phone</p>
                  <a
                    href="tel:+15555555555"
                    className="text-base text-muted-foreground hover:text-blue-600"
                  >
                    (555) 555-5555
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt>
                  <Mail className="h-7 w-6 text-muted-foreground" aria-hidden="true" />
                </dt>
                <dd>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <a
                    href="mailto:info@timhorst.com"
                    className="text-base text-muted-foreground hover:text-blue-600"
                  >
                    info@timhorst.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt>
                  <MapPin className="h-7 w-6 text-muted-foreground" aria-hidden="true" />
                </dt>
                <dd>
                  <p className="text-sm font-semibold text-foreground">Location</p>
                  <p className="text-base text-muted-foreground">
                    Serving Chatham-Kent and surrounding areas
                  </p>
                </dd>
              </div>
            </dl>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground">Follow Us</h3>
              <div className="mt-4 flex gap-x-6">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Calendly Widget */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-foreground">
                Schedule a Consultation
              </h3>
              <p className="mt-2 text-muted-foreground">
                Choose a convenient time for a free consultation about your project.
              </p>
              <div className="mt-4">
                <Button asChild size="lg">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      // Here we would typically open Calendly
                      console.log('Open Calendly');
                    }}
                    className="flex items-center gap-2"
                  >
                    Schedule Now
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="space-y-8">
            {/* Google Maps */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                Our Service Area
              </h2>
              {renderMap()}
              <div className="mt-4 flex items-center text-muted-foreground">
                <Navigation className="h-5 w-5 mr-2" />
                <p>Chatham, Ontario and surrounding regions</p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Send Us a Message
              </h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 555-5555" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}