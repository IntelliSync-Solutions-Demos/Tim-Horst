import express from 'express';
import { uploadthingRouter } from "./src/server/uploadthing";
import cors from 'cors';

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Create uploadthing handler
app.use("/api/uploadthing", uploadthingRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
