"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';

import { toast } from 'sonner';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Zod schema for validation
const portfolioSchema = z.object({
  title: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(2, "Location is required"),
  date: z.string().min(1, "Date is required"),
  status: z.string().min(1, "Status is required"),
  details: z.array(z.string()).optional(),
  testimonialContent: z.string().optional(),
  testimonialAuthor: z.string().optional(),
  testimonialRole: z.string().optional(),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

export function PortfolioUploadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid File Type", {
        description: "Please upload a JPEG, PNG, WebP, or GIF image.",
      });
      return;
    }

    // Check file size (max 4MB)
    const maxSize = 4 * 1024 * 1024; // 4MB in bytes
    if (file.size > maxSize) {
      toast.error("File Too Large", {
        description: "Image must be less than 4MB.",
      });
      return;
    }

    try {
      setIsUploading(true);
      // TODO: Implement Supabase upload here
      const mockUrl = 'https://placeholder.com/image.jpg'; // This will be replaced with actual Supabase upload
      
      setImageUrl(mockUrl);
      toast.success("Success", {
        description: "Image uploaded successfully"
      });
    } catch (error) {
      toast.error("Upload Error", {
        description: error instanceof Error ? error.message : 'Failed to upload image',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue,
    watch
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      details: [''],
    }
  });

  const onSubmit = async (data: PortfolioFormData) => {
    // Validate image upload
    if (!imageUrl) {
      toast.error("Error", {
        description: 'Please upload an image',
      });
      return;
    }

    try {
      // Prepare project data for submission
      const projectData = {
        ...data,
        imageUrl,
        details: data.details?.filter(detail => detail.trim() !== '') || [],
        testimonial: (watch('testimonialContent') && watch('testimonialAuthor')) ? {
          quote: watch('testimonialContent') || '',
          author: watch('testimonialAuthor') || '',
          role: watch('testimonialRole') || 'Client'
        } : undefined
      };

      // TODO: Implement Supabase database insert
      console.log('Project data to be saved:', projectData);

      toast.success("Success", {
        description: 'Project uploaded successfully'
      });
      // Reset form or close modal
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error('Error uploading project:', error);
      toast.error("Error", {
        description: 'Failed to upload project',
      });
    }
  };

  const addDetailField = () => {
    const currentDetails = watch('details') || [];
    setValue('details', [...currentDetails, '']);
  };

  const removeDetailField = (index: number) => {
    const currentDetails = watch('details') || [];
    setValue('details', currentDetails.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white">
          Add Portfolio Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload New Portfolio Project</DialogTitle>
          <DialogDescription>
            Add a new project to showcase your work. Fill in all the details and upload before/after images.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Project Title</Label>
              <Input 
                {...register('title')} 
                placeholder="Modern Window Installation" 
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            <div>
              <Label>Location</Label>
              <Input 
                {...register('location')} 
                placeholder="Chatham, ON" 
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Select 
                {...register('category')}
                onValueChange={(value) => setValue('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="windows">Windows</SelectItem>
                  <SelectItem value="doors">Doors</SelectItem>
                  <SelectItem value="exterior">Exterior Renovations</SelectItem>
                  <SelectItem value="interior">Interior Finishing</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
            <div>
              <Label>Project Date</Label>
              <Input 
                type="date" 
                {...register('date')} 
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea 
              {...register('description')} 
              placeholder="Provide a brief description of the project" 
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Project Image</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="w-full"
                  />
                  <Button
                    type="button"
                    disabled={isUploading}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                  >
                    <Upload size={20} />
                    {isUploading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Accepted formats: JPEG, PNG, WebP, GIF (max 4MB)
                </p>
              </div>
              {imageUrl && (
                <div className="mt-2">
                  <img 
                    src={imageUrl} 
                    alt="Uploaded project image" 
                    className="max-w-xs rounded-lg shadow-md" 
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {watch('details')?.map((detail, index) => (
              <div key={index}>
                <Label>Detail {index + 1}</Label>
                <Textarea 
                  {...register(`details.${index}`)} 
                  placeholder="Provide a brief description of the detail"
                  defaultValue={detail}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => removeDetailField(index)}
                  className="mt-2"
                >
                  Remove Detail
                </Button>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              onClick={addDetailField}
              className="mt-2"
            >
              Add Detail
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Testimonial Author</Label>
              <Input 
                {...register('testimonialAuthor')} 
                placeholder="Client Name" 
              />
            </div>
            <div>
              <Label>Testimonial Content</Label>
              <Textarea 
                {...register('testimonialContent')} 
                placeholder="Client testimonial" 
              />
            </div>
            <div>
              <Label>Testimonial Role</Label>
              <Input 
                {...register('testimonialRole')} 
                placeholder="Client Role" 
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Upload Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
