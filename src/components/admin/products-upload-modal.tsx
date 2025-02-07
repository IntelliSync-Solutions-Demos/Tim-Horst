import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadButton } from "@uploadthing/react";
import { Upload } from 'lucide-react';

import type { UploadedFileData } from "uploadthing/types";
import type { OurFileRouter } from "@/lib/uploadthing";
import { useToast } from '@/hooks/use-toast';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Zod schema for validation
const productSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductsUploadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      // TODO: Implement actual submission logic
      console.log('Product Data:', { ...data, imageUrl });
      
      // Show success toast
      toast({
        title: "Product Uploaded",
        description: "Your product has been successfully uploaded.",
        status: "success"
      });
      
      // Reset form and close modal
      reset();
      setIsOpen(false);
    } catch (error) {
      // Show error toast
      console.error("Product upload failed:", error);
      toast({
        title: "Upload Failed",
        description: `There was an error uploading the product: ${error instanceof Error ? error.message : 'Unknown error'}`,
        status: "error"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
          Upload Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Product Title</Label>
            <Input 
              {...register('title')} 
              placeholder="Enter product title" 
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
          
          <div>
            <Label>Product Description</Label>
            <Input 
              {...register('description')} 
              placeholder="Enter product description" 
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          
          <div>
            <Label>Product Image</Label>
            <UploadButton<OurFileRouter, "productImage">
              endpoint="productImage"
              appearance={{
                button: "bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2 flex items-center justify-center gap-2",
                container: "w-full",
                allowedContent: "text-sm text-gray-600"
              }}
              content={{
                button({ ready }) {
                  return (
                    <div className="flex items-center gap-2">
                      <Upload size={20} />
                      {ready ? "Image Upload" : "Upload"}
                    </div>
                  );
                }
              }}
              onUploadBegin={() => {
                setIsUploading(true);
              }}
              onClientUploadComplete={(res: UploadedFileData[]) => {
                setIsUploading(false);
                const validFiles = res.filter(file => file && typeof file.url === 'string');
                if (validFiles.length > 0) {
                  setImageUrl(validFiles[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                setIsUploading(false);
                toast({
                  title: "Upload failed",
                  description: error.message,
                  variant: "destructive",
                });
              }}
            />
            {imageUrl && (
              <div className="mt-2">
                <img 
                  src={imageUrl} 
                  alt="Uploaded Product" 
                  className="max-w-[200px] max-h-[200px]" 
                />
              </div>
            )}
          </div>
          
          <Button type="submit" disabled={!imageUrl || isUploading}>
            Save Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
