import express from "express";
import { createResume, deleteResume, getResumeById, updateResume } from "../controller/resumeController.js";
import userAuth from "../middleware/userAuth.js"
import upload from "../middleware/uploadMulter.js"

const resumeRoute = express.Router();

resumeRoute.post("/create", userAuth, createResume);
resumeRoute.get("/get/:resumeId", userAuth, getResumeById);
resumeRoute.put("/update", upload.single("image"), userAuth, updateResume);
resumeRoute.delete("/delete/:resumeId", userAuth, deleteResume);

export default resumeRoute;