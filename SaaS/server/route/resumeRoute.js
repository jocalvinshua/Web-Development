import express from "express";
import { createResume, deleteResume, getResumeById, updateResume } from "../controller/resumeController.js";
import userAuth from "../middleware/userAuth.js"
import upload from "../middleware/uploadMulter.js"

const resumeRoute = express.Router();

resumeRoute.post("/create", userAuth, createResume);
resumeRoute.put("/update", userAuth, upload.single('image'), updateResume);
resumeRoute.delete("/delete/:resumeId", userAuth, deleteResume)
resumeRoute.get('/get/:resumeId', userAuth, getResumeById)

export default resumeRoute;