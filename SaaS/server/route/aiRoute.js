import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { EnhanceDescription, EnhanceSummary, UploadResume } from '../controller/aiController.js'

const aiRoute = express.Router()

aiRoute.post('/enhance-sum', userAuth, EnhanceSummary)
aiRoute.post('/enhance-desc', userAuth, EnhanceDescription)
aiRoute.post('/upload-resume', userAuth, UploadResume)

export default aiRoute