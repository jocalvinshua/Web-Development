import Resume from "../model/Resume";

// Enhance professional summary
export const EnhanceSummary = async(req,res)=>{
    try {
        const {userContent} = req.body
            if(!userContent){
                return res.status(400).json({message: "Missing required fields"})
            }
        
            await openai.chat.completions.create({
            model: process.env.OPENAI_API_MODEL,
            messages: [
                {   role: "system",
                    content: "You are an expert in resume writing. Your tassk is to enhance the proffesional summy of a resume. The summary should be 1-2 sentences also highliting key skills, experience, and career objectives. Make it compelling and ATS-friendly. And only return text no options or anythinng else." 
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhanceContent = response.choices[0].message.contentreturn 
        return res.status(200).json({enhanceContent})
    } catch (error) {
        
    }
}

// Enhance resume's job description
export const EnhanceDescription = async(res,req)=>{
    try {
        const {userContent} = req.body
            if(!userContent){
                return res.status(400).json({message: "Missing required fields"})
            }
        
            await openai.chat.completions.create({
            model: process.env.OPENAI_API_MODEL,
            messages: [
                {   role: "system",
                    content: "You are an expert in resume writing. Your tassk is to enhance the proffesional summy of a resume. The summary should be 1-2 sentences also highliting key skills, experience, and career objectives. Make it compelling and ATS-friendly. And only return text no options or anythinng else." 
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
            });

        const enhanceContent = response.choices[0].message.contentreturn 
        return res.status(200).json({enhanceContent})

    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({
            success: false,
            message: message.error
        });
    }
}

// Upload Existing resume
export const UploadResume = async(res,req)=>{
    try {
        const {resumeText, title} = req.body
        const {userId} = req.userId
        if(!resumeText){
            return res.status(400).json({ 
            success: false, 
            message: "Missing required field" 
        });
        }

        const userPrompt = `Extract data from this resume: ${resumeText}
        
        Provide data in the following JSON format with no additional text before or after:
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
              default: classic
            },
            accentColor: {
              type: String,
              default: "#3B82F6"
            },
            personalInfo: {
              image: {type: String, default: ''},
              fullName: {type: String, default: ''},
              email: {type: String, default: ''},
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
        
            skills: [String]
        }
        `
        const systemPrompt = "You are an expert AI Agent to extract data from resume"
        await openai.chat.completions.create({
            model: process.env.OPENAI_API_MODEL,
            messages: [
                {   role: "system",
                    content: systemPrompt,
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: {type: 'json_object'}
        });

        const extractedData = response.choices[0].message.content
        const parsedData = JSON.parse(extractedData)
        const newResume = await Resume.create({userId, title, ...parsedData})

        res.json({resumeId: newResume._id})
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({
            success: false,
            message: message.error
        });
    }
}