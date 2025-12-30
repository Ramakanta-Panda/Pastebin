import express from "express";
import {
  createPaste,
  getPasteApi,
  getPasteHtml
} from "../controllers/pasteControllers.js";

const router = express.Router();

router.post("/pastes", createPaste);
router.get("/pastes/:id", getPasteApi);
router.get("/p/:id", getPasteHtml);

export default router;
