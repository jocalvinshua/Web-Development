import express from "express";
import { createResume, saveResumeContent } from "../controller/resumeController.js";
import authMiddleware from "../middleware/userAuth.js";
import upload from "../middleware/uploadMulter.js"

const resumeRoute = express.Router();

resumeRoute.post("/create", authMiddleware, createResume);
// resumeRoute.patch("/save-content", authMiddleware, saveResumeContent);
resumeRoute.patch("/save-content", authMiddleware, upload.single('image'), saveResumeContent);

export default resumeRoute;