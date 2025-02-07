import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const productSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductsUploadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  });

  const { startUpload, isUploading } = useUploadThing("productImage", {
    onClientUploadComplete: (res: { url: string }[]) => {
      const uploadedImageUrl = res[0].url;
      setImageUrl(uploadedImageUrl);
      setValue('imageUrl', uploadedImageUrl);
      toast({
        title: "Image Uploaded",
        description: "Your product image has been successfully uploaded.",
        status: "success"
      });
    },
    onUploadError: (error: Error) => {
      toast({
        title: "Upload Error",
        description: `ERROR! ${error.message}`,
        status: "error"
      });
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    if (!imageUrl) {
      toast({
        title: "Upload Required",
        description: "Please upload an image before submitting.",
        status: "error"
      });
      return;
    }
    
    // Implement your product creation logic here
    console.log("Product data:", data);
    reset();
    setIsOpen(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await startUpload([file]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
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
            <Input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            {imageUrl && (
              <div className="mt-2">
                <img 
                  src={imageUrl} 
                  alt="Uploaded Product" 
                  className="max-w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={!imageUrl || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Create Product'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
