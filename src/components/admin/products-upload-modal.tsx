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
  price: z.number({ invalid_type_error: "Price must be a number" }).min(0, "Price must be greater than or equal to 0"),
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
    setValue,
    getValues
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
    
    // Implement product creation logic here
    console.log("Product data:", data);
    reset();
    setIsOpen(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a JPEG, PNG, WebP, or GIF image.",
        status: "error"
      });
      return;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Image must be less than 5MB.",
        status: "error"
      });
      return;
    }

    await startUpload([file], {
      title: getValues('title'),
      description: getValues('description'),
      category: "products",
      price: String(getValues('price'))
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">Add Product</Button>
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
            <Label>Product Price</Label>
            <Input 
              type="number" 
              {...register('price')} 
              placeholder="Enter product price" 
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>

          <div>
            <Label>Product Image</Label>
            <Input 
              type="file" 
              accept="image/jpeg,image/png,image/webp,image/gif" 
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            <p className="text-sm text-gray-500 mt-1">
              Accepted formats: JPEG, PNG, WebP, GIF (max 5MB)
            </p>
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
            variant="default"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isUploading ? 'Uploading...' : 'Create Product'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
