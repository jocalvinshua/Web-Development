import Resume from "../model/Resume.js";

export const saveResume = async (req, res) => {
  try {
    const userId = req.user;
    let resumeData = JSON.parse(req.body.data);
    if (!resumeData._id || resumeData._id === "" || resumeData._id === "null") {
      delete resumeData._id;
    }

    let resume;
    if (resumeData._id) {
      // Logika Update
      resume = await resumeModel.findOneAndUpdate(
        { _id: resumeData._id, userId },
        { ...resumeData, userId },
        { new: true }
      );
    } else {
      // Logika Create
      resume = new resumeModel({ ...resumeData, userId });
      await resume.save();
    }

    res.json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user }).sort({ updatedAt: -1 });
        res.status(200).json({ success: true, resumes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.user });
        
        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume tidak ditemukan atau akses ditolak" });
        }

        res.status(200).json({ success: true, resume });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteResume = async (req, res) => {
    try {
        const deletedResume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user });

        if (!deletedResume) {
            return res.status(404).json({ success: false, message: "Resume tidak ditemukan" });
        }

        res.status(200).json({ success: true, message: "Resume berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const renameResume = async (req, res) => {
    try {
        const { resumeId, title } = req.body;
        const userId = req.user;

        if (!title || title.trim() === "") {
            return res.status(400).json({ success: false, message: "Title is required" });
        }
        const resume = await resumeModel.findOne({ _id: resumeId, userId });

        if (!resume) {
            return res.status(404).json({ 
                success: false, 
                message: "Resume not found or unauthorized" 
            });
        }

        resume.title = title;
        await resume.save();

        res.json({ success: true, message: "Resume renamed successfully" });

    } catch (error) {
        console.error("Rename Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};