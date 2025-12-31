import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, default: 'Untitled Resume' },
  templateId: { type: String, default: 'modern-1' },
  
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    summary: String, // Bagian yang sering dioptimasi AI
  },

  experience: [{
    company: String,
    role: String,
    location: String,
    startDate: String,
    endDate: String,
    description: String, // Deskripsi poin-poin pekerjaan
    isCurrent: { type: Boolean, default: false }
  }],

  education: [{
    school: String,
    degree: String,
    fieldOfStudy: String,
    year: String,
    description: String
  }],

  skills: [String],
  
  languages: [{
    language: String,
    level: String // Contoh: Native, Fluent, Intermediate
  }],

  // Metadata untuk keperluan AI
  aiMetadata: {
    isOptimized: { type: Boolean, default: false },
    lastAiUpdate: Date,
    keywordsSuggested: [String]
  }

}, { timestamps: true });


const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);

export default Resume