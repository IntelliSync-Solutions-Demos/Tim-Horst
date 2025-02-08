import express from "express";
import { createRouteHandler } from "uploadthing/express";
import { ourFileRouter } from "../lib/uploadthing";

// Create an Express router for uploadthing
export const uploadthingRouter = express.Router();

// Add the file upload route
uploadthingRouter.use("/", createRouteHandler({
  router: ourFileRouter,
  config: { callbackUrl: "/api/uploadthing" }
}));
