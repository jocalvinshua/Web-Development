import Resume from "../model/Resume.js"

export const createResume = async (req, res) => {
    try {
        const userId = req.user;
        const { title, personalInfo } = req.body;

        const newResume = new Resume({
            user: userId,
            title: title || "Untitled Resume",
            personalInfo: personalInfo || {}
        });

        const savedResume = await newResume.save();
        res.status(201).json({ success: true, data: savedResume });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUserResumes = async (req, res) => {
    try {
        const userId = req.user;
        const resumes = await Resume.find({ user: userId }).sort({ updatedAt: -1 });
        
        res.status(200).json({ success: true, resumes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        
        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume tidak ditemukan" });
        }

        if (resume.user.toString() !== req.user) {
            return res.status(401).json({ success: false, message: "Akses ditolak" });
        }

        res.status(200).json({ success: true, resume });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateResume = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedResume = await Resume.findOneAndUpdate(
            { _id: id, user: req.user }, // Filter berdasarkan ID dan Kepemilikan User
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedResume) {
            return res.status(404).json({ success: false, message: "Resume tidak ditemukan atau Anda tidak memiliki akses" });
        }

        res.status(200).json({ success: true, message: "Resume updated successfully", data: updatedResume });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteResume = async (req, res) => {
    try {
        const deletedResume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user });

        if (!deletedResume) {
            return res.status(404).json({ success: false, message: "Resume gagal dihapus" });
        }

        res.status(200).json({ success: true, message: "Resume deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};