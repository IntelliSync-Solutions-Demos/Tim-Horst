import { createUploadthing } from "uploadthing/server";
import type { FileRouter, UploadedFileData } from "uploadthing/types";
import { generateReactHelpers } from "@uploadthing/react";
import { ourFileRouter as baseFileRouter } from "./uploadthing-router";
import { z } from "zod";

type Metadata = { userId: string } & Record<string, unknown>;

type OurFileRouterType = FileRouter;

// FileRouter for app, can contain multiple FileRoutes
const f = createUploadthing();

export const ourFileRouter: OurFileRouterType = {
  ...baseFileRouter,
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
      // Simple placeholder authentication
      // TODO: Replace with proper authentication
      return {
        userId: 'admin',
        projectData: input
      };
    })
    .onUploadComplete(async ({ metadata, file }: { metadata: Metadata, file: UploadedFileData }) => {
      console.log("Portfolio project upload complete for userId:", metadata.userId);
      console.log("Project data:", metadata.projectData);
      console.log("Uploaded file:", file.url);
      return { url: file.url };
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
      // Simple placeholder authentication
      // TODO: Replace with proper authentication
      return {
        userId: 'admin',
        section: input.section
      };
    })
    .onUploadComplete(async ({ metadata, file }: { metadata: Metadata, file: UploadedFileData }) => {
      console.log(`Admin image upload for section ${metadata.section} by user ${metadata.userId}`);
      console.log("File URL", file.url);
      return { url: file.url };
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
      // Simple placeholder authentication
      // TODO: Replace with proper authentication
      return {
        userId: 'admin',
        section: input.section
      };
    })
    .onUploadComplete(async ({ metadata, file }: { metadata: Metadata, file: UploadedFileData }) => {
      console.log(`Admin document upload for section ${metadata.section} by user ${metadata.userId}`);
      console.log("File URL", file.url);
      return { url: file.url };
    })
};

export const { useUploadThing } = generateReactHelpers<typeof ourFileRouter>();

// Export the type directly from the router file
export type { OurFileRouter } from "./uploadthing-router";
