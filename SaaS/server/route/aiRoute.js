import express from 'express'
import userAuth from '../middleware/userAuth'
import { EnhanceDescription, EnhanceSummary, UploadResume } from '../controller/aiController'

const aiRoute = express.Router()

aiRoute.post('/enhance-sum', userAuth, EnhanceSummary)
aiRoute.post('/enhance-desc', userAuth, EnhanceDescription)
aiRoute.post('/upload-resume', userAuth, UploadResume)