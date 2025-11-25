import exprss from "express";
import {generateMCQs,generateFlashcards,generateNotes,summarizeText} from "../controllers/tools.controller.js";
const router = exprss.Router();



router.post("/generate-mcqs", generateMCQs);
router.post("/generate-flashcards",generateFlashcards)
router.post("/generate-notes", generateNotes);
router.post("/summarize-text", summarizeText);

export default router;