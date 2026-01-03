import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "Untitled Resume",
    },
    personalInfo: {
      image: String,
      fullName: String,
      email: String,
      location: String,
      profession: String,
      linkedinUrl: String,
      profileUrl: String,
    },

    professionalSummary: String,

    experiences: [
      {
        companyName: String,
        jobTitle: String,
        startDate: String,
        endDate: String,
        jobDescription: String,
      },
    ],

    education: [
      {
        institutionName: String,
        degree: String,
        startDate: String,
        endDate: String,
        gpa: String,
      },
    ],

    projects: [
      {
        projectName: String,
        projectType: String,
        description: String,
      },
    ],

    skills: [String],
  },
  { timestamps: true }
);

const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);

export default Resume;