import express from "express";
import {
  getDocuments,
  addDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.get("/", getDocuments);
router.post("/", addDocument);

export default router;