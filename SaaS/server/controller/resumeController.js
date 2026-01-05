import Resume from "../model/Resume.js";
import fs from "fs"

export const createResume = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.userId;
    
    if (!title) {
        return res.status(400).json({ 
            success: false, 
            message: "Title is required" 
        });
    }
    if (!userId) {
        return res.status(401).json({ 
            success: false, 
            message: "Unauthorized Access. Login Again" 
        });
    }
    // Create Resume
    const newResume = new Resume({
      userId, title
    });

    await newResume.save();
    
    res.status(201).json({ 
        success: true, 
        message: "Resume created successfully",
        data: newResume 
    });
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
    });
  }
};

export const updateResume = async (req, res) => {
  try {
    const { resumeId, resumeData, removeBackground } = req.body;
    const userId = req.user.id;
    const image = req.file;

    let resumeDataCopy = JSON.parse(resumeData);
    const resume = await Resume.findByIdAndUpdate({
        userId,
        _id: resumeId
    }, resumeDataCopy, {new: true})

    if(image){
        const imageBuferData = fs.createReadStream(image.path)
        const response = await client.files.upload({
          file: imageBuferData,
          fileName: 'resume.jpg',
          folder: 'user-resumes',
          transformation:{
            pre: 'w-300, h-300, fo-face z-0.75' + (removeBackground ? ',e-bgremove': '')
          }
        });

        resumeDataCopy.personal_info.image = response.url
    }

    res.json({ 
        success: true, 
        message: "Resume content saved successfully",
        data: resume 
    });
    
    if (!resumeId) {
        return res.status(400).json({ 
            success: false, 
            message: "Resume ID is required" 
        });
    }
    if (!userId) {
        return res.status(401).json({ 
            success: false, 
            message: "Unauthorized Access. Login Again" 
        });
    }

    // let updateData = {};
    
    // const keys = [
    //     'personalInfo',
    //     'professionalSummary',
    //     'experiences',
    //     'education',
    //     'projects',
    //     'skills',
    //     'template',
    //     'accentColor'
    // ];
    
    // keys.forEach(key => {
    //   if (req.body[key]) {
    //     try {
    //         updateData[key] = typeof req.body[key] === 'string' 
    //             ? JSON.parse(req.body[key]) 
    //             : req.body[key];
    //     } catch (error) {
    //         console.error(`Error parsing ${key}:`, error);
    //         updateData[key] = req.body[key];
    //     }
    //   }
    // });

    // if (req.file) {
    //   updateData.personalInfo = {
    //     ...(updateData.personalInfo || {}),
    //     image: req.file.path
    //   };
    // }

    // console.log('Update data:', updateData);
    
  } catch (error) {
    console.error("Error saving resume content:", error);
    res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
    });
  }
};

export const getResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access. Login Again"
            });
        }

        const resume = await Resume.findOne({
            _id: resumeId,
            userId
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

// export const getAllResumes = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         if (!userId) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized Access. Login Again"
//             });
//         }

//         const resumes = await Resume.find({ user: userId })
//             .sort({ updatedAt: -1 })
//             .select('-__v');

//         res.json({
//             success: true,
//             count: resumes.length,
//             data: resumes
//         });
//     } catch (error) {
//         console.error("Error fetching resumes:", error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// };

export const deleteResume = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access. Login Again"
            });
        }

       await Resume.findOneAndDelete({
            _id: resumeId,
            userId
        });

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