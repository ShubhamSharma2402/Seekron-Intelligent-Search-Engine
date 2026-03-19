import express from "express";
import cors from "cors";

import searchRoutes from "./routes/searchRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import autocompleteRoutes from "./routes/autocompleteRoutes.js";

import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Routes
app.use("/api/search", searchRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/autocomplete", autocompleteRoutes);

// 🔹 Health check
app.get("/", (req, res) => {
  res.send("🚀 Search Engine API Running");
});

// 🔹 Error handler (must be last)
app.use(errorHandler);

export default app;