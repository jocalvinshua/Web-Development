import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './route/userRoute.js'
// import router from './route/taskRoute.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Config DB
connectDB()

// // MiddelWare
app.use(express.json())

// // API Endpoints
// app.use('/api/task',router)
app.use('/api/user', userRouter)

app.get('/',(req,res)=>{
  res.send('Task Management API is Working')
})

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`)
})