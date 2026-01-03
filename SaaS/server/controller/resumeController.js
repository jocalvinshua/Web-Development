import Resume from "../model/Resume.js";

export const createResume = async (req, res) => {
  try {
    // console.log("Body:", req.body)
    // console.log("User ID:", req.user?.id)

    const { title } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title is required" });

    const newResume = new Resume({
      user: req.user.id,
      title: title,
    });

    await newResume.save();
    res.status(201).json({ success: true, data: newResume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const saveResumeContent = async (req, res) => {
  try {
    const { resumeId } = req.body;
    let updateData = {};
    const keys = ['personalInfo', 'experiences', 'education', 'projects', 'skills', 'professionalSummary'];
    
    keys.forEach(key => {
      if (req.body[key]) {
        updateData[key] = typeof req.body[key] === 'string' 
          ? JSON.parse(req.body[key]) 
          : req.body[key];
      }
    });
    if (req.file) {
      updateData.personalInfo = {
        ...updateData.personalInfo,
        image: req.file.path
      };
    }
    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, user: req.user.id },
      { $set: updateData },
      { new: true }
    );
    res.json({ success: true, data: resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};