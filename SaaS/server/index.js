import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import connectDB from './config/configDB.js'
import resumeRoute from './route/resumeRoute.js'
import userRoute from './route/userRoute.js'

const app = express()
const port = process.env.PORT || 5000

connectDB(); 

// --- MIDDLEWARE ---
app.use(cors({
    credentials: true, 
    origin: process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser()) 

// --- ROUTES ---
app.get('/', (req, res) => {
    res.send('API is Working')
})

app.use('/api/user', userRoute)
app.use('/api/resume', resumeRoute)

app.listen(port, () => {
    console.log(`Server is Running at http://localhost:${port}`)
})