import express from 'express'
import cors from 'cors'
import configDB from './config/configDB.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './Route/authRoute.js'
import userRouter from './Route/userRoute.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// Frontend URL
const FRONTEND_URL = "http://localhost:5173";

// Middleware
app.use(express.json())
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(cookieParser())

// Get request body
app.get('/', (req, res) => {
  res.send('Welcome to the Login Site API')
})

// Config DB
await configDB()

// API Endpoints
app.use('/api/auth', authRoutes)
app.use('/api/user', userRouter)

// Listen to server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})