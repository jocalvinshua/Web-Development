import Resume from "../model/Resume.js";
import openai from "../config/openAi.js";

// Enhance professional summary
export const EnhanceSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ success: false,message: "Missing required fields" });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_API_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert in resume writing. Enhance the summary to be 1-2 sentences, compelling, and ATS-friendly. Return only the enhanced text."
        },
        { role: "user", content: userContent },
      ],
    });

    const enhanceContent = response.choices[0].message.content;
    return res.status(200).json({ success: true, enhanceContent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Enhance resume's job description
export const EnhanceDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_API_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert in resume writing. Enhance the job description using action verbs and measurable results. Return only the text."
        },
        { role: "user", content: userContent },
      ],
    });

    const enhanceContent = response.choices[0].message.content;
    return res.status(200).json({ success: true, enhanceContent });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Upload Existing resume
export const UploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.user.id;

    if (!resumeText) {
      return res.status(400).json({ success: false, message: "Missing resume text" });
    }

    const userPrompt = `Extract data from this resume text: ${resumeText}. 
    Return a JSON object with: personalInfo (fullName, email, location, profession, linkedinUrl), 
    professionalSummary (string), experiences (array of objects: companyName, jobTitle, startDate, endDate, jobDescription), 
    education (array: institutionName, degree, startDate, endDate), projects (array), and skills (array of strings).`;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_API_MODEL || "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an AI that extracts resume data into structured JSON." },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);

    // Simpan ke DB dengan userId yang benar
    const newResume = await Resume.create({
      user: userId, 
      title: title || "Imported Resume",
      ...parsedData
    });

    res.json({ success: true, resumeId: newResume._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};