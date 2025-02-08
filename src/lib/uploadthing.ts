import { createUploadthing } from "uploadthing/server";

import { generateReactHelpers } from "@uploadthing/react";
import { z } from "zod";

type Metadata = { userId: string } & Record<string, unknown>;

// FileRouter for app, can contain multiple FileRoutes
const f = createUploadthing();

// Export the type for the file router
export type OurFileRouter = typeof ourFileRouter;

export const ourFileRouter = {
  portfolioProject: f({ 
    image: { maxFileSize: "4MB", maxFileCount: 2 } 
  })
    .input(z.object({
      title: z.string().min(2, "Title must be at least 2 characters"),
      description: z.string().optional(),
      category: z.string(),
      location: z.string(),
      date: z.string(),
      status: z.string(),
      details: z.array(z.string()).optional(),
      testimonial: z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string()
      }).optional()
    }))
    .middleware((): Metadata => ({ userId: "test" }))
    .onUploadComplete(() => {}),

  productImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 }
  })
    .input(z.object({
      title: z.string().min(2, "Title must be at least 2 characters"),
      description: z.string().optional(),
      category: z.string(),
      price: z.string()
    }))
    .middleware((): Metadata => ({ userId: "test" }))
    .onUploadComplete(() => {})
};

export const { useUploadThing } = generateReactHelpers<typeof ourFileRouter>();
