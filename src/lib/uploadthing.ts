import { createUploadthing } from "uploadthing/server";
import type { FileRouter, UploadedFileData } from "uploadthing/types";
type Metadata = { userId: string } & Record<string, unknown>;
import { z } from "zod";

const f = createUploadthing();

// FileRouter for app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Product image upload
  productImage: f({ 
    image: { maxFileSize: "4MB", maxFileCount: 1 } 
  })
    .middleware(async () => {
      // Check if user is authenticated using localStorage
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      const adminUsername = localStorage.getItem('adminUsername');
      
      if (!isAdmin || !adminUsername) {
        throw new Error('Unauthorized: Admin access required');
      }
      
      return { userId: adminUsername };
    })
    .onUploadComplete(async ({ file }: { file: UploadedFileData }) => {
      console.log("Product image upload complete", file.url);
      // You can add additional logic here like updating a database
      return { url: file.url };
    }),
  
  // Portfolio image uploads
  portfolioBeforeImage: f({ 
    image: { maxFileSize: "4MB", maxFileCount: 1 } 
  })
    .middleware(async () => {
      // Check if user is authenticated
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      const adminUsername = localStorage.getItem('adminUsername');
      
      if (!isAdmin || !adminUsername) {
        throw new Error('Unauthorized');
      }
      
      return { userId: adminUsername };
    })
    .onUploadComplete(async ({ file }: { file: UploadedFileData }) => {
      console.log("Portfolio before image upload complete", file.url);
    }),

  portfolioAfterImage: f({ 
    image: { maxFileSize: "4MB", maxFileCount: 1 } 
  })
    .middleware(async () => {
      // Check if user is authenticated
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      const adminUsername = localStorage.getItem('adminUsername');
      
      if (!isAdmin || !adminUsername) {
        throw new Error('Unauthorized');
      }
      
      return { userId: adminUsername };
    })
    .onUploadComplete(async ({ file }: { file: UploadedFileData }) => {
      console.log("Portfolio after image upload complete", file.url);
    }),

  // Portfolio project image uploads
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
        content: z.string().optional(),
        author: z.string().optional(),
        rating: z.number().min(1).max(5).optional()
      }).optional()
    }))
    .middleware(async ({ input }) => {
      // Check if user is authenticated
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      const adminUsername = localStorage.getItem('adminUsername');
      
      if (!isAdmin || !adminUsername) {
        throw new Error('Unauthorized');
      }
      
      return {
        userId: adminUsername,
        projectData: input
      };
    })
    .onUploadComplete(async ({ metadata, file }: { metadata: Metadata, file: UploadedFileData }) => {
      console.log("Portfolio project upload complete for userId:", metadata.userId);
      console.log("Project data:", metadata.projectData);
      console.log("Uploaded file:", file.url);
    }),

  adminImageUpload: f({ 
    image: { maxFileSize: "8MB", maxFileCount: 5 } 
  })
    .input(z.object({
      section: z.string().min(2, "Section must be specified"),
      title: z.string().optional(),
      description: z.string().optional(),
      category: z.string().optional(),
    }))
    .middleware(async ({ input }: { input: { section: string; title?: string; description?: string; category?: string } }) => {
      // Check if user is authenticated
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      const adminUsername = localStorage.getItem('adminUsername');
      
      if (!isAdmin || !adminUsername) {
        throw new Error('Unauthorized');
      }
      
      return {
        userId: adminUsername,
        section: input.section
      };
    })
    .onUploadComplete(async ({ metadata, file }: { metadata: Metadata, file: UploadedFileData }) => {
      console.log(`Admin image upload for section ${metadata.section} by user ${metadata.userId}`);
      console.log("File URL", file.url);
    }),

  adminDocumentUpload: f({ 
    pdf: { maxFileSize: "4MB" as const, maxFileCount: 3 },
    text: { maxFileSize: "4MB" as const, maxFileCount: 3 }
  })
    .input(z.object({
      section: z.string().min(2, "Section must be specified"),
      title: z.string().optional(),
      description: z.string().optional(),
      category: z.string().optional(),
    }))
    .middleware(async ({ input }: { input: { section: string; title?: string; description?: string; category?: string } }) => {
      // Check if user is authenticated
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      const adminUsername = localStorage.getItem('adminUsername');
      
      if (!isAdmin || !adminUsername) {
        throw new Error('Unauthorized');
      }
      
      return {
        userId: adminUsername,
        section: input.section
      };
    })
    .onUploadComplete(async ({ metadata, file }: { metadata: Metadata, file: UploadedFileData }) => {
      console.log(`Admin document upload for section ${metadata.section} by user ${metadata.userId}`);
      console.log("File URL", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
