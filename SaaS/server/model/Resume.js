import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "Untitled Resume",
    },
    template:{
      type: String,
      default: "classic"
    },
    accentColor: {
      type: String,
      default: "#3B82F6"
    },
    personalInfo: {
      image: {type: String, default: ''},
      fullName: {type: String, default: ''},
      email: {type: String, default: ''},
      phoneNumber: { type: String, default: ''},
      location: {type: String, default: ''},
      profession: {type: String, default: ''},
      linkedinUrl: {type: String, default: ''},
      profileUrl: {type: String, default: ''},
    },

    professionalSummary: {type: String, default: ''},

    experiences: [
      {
        companyName: String,
        jobTitle: String,
        position: String,
        startDate: String,
        endDate: String,
        jobDescription: String,
        isCurrent: Boolean
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
  { timestamps: true, minimize: false }
);

const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);

export default Resume;
