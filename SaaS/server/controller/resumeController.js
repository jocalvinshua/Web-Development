import Resume from "../model/Resume.js";
import fs from "fs"
import imagekit from "../config/imageKit.js";

export const createResume = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.userId;

    // Create new resume
    const newResume = await Resume.create({
      userId,
      title,
    });

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume: newResume,
    });

  } catch (error) {
    console.error("Create Resume Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const image = req.file;
    const { resumeId, resumeData, removeBackground } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required",
      });
    }

    let resumeDataCopy = JSON.parse(JSON.stringify(resumeData));

    if(typeof resumeData === 'string'){
      resumeDataCopy = await JSON.parse(resumeData)
    }else{
      resumeDataCopy = structuredClone(resumeData)
    }
    if (image) {
      const fileBuffer = fs.readFileSync(image.path);

      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: `resume_image_${resumeId}.jpg`,
        folder: "/user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face" +
            (removeBackground === "true" ? ",e-bgremove" : ""),
        },
      });

      resumeDataCopy.personalInfo = {
        ...resumeDataCopy.personalInfo,
        image: response.url,
      };

      fs.unlinkSync(image.path);
    }

    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      { $set: resumeDataCopy },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.json({
      success: true,
      message: "Resume updated successfully",
      data: resume,
    });
  } catch (error) {
    console.error("Update Resume Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.userId;

        const resume = await Resume.findOne({
          _id: resumeId,
          userId: userId
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        res.json({
            success: true,
            message: "Resume Found",
            data: resume
        });
        
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const deleteResume = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.userId;

        await Resume.findOneAndDelete({
          _id: resumeId,
          userId: userId
        });

        // Response
        res.json({
            success: true,
            message: "Resume deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting resume:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};