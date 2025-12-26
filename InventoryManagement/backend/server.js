import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
const port = 5000

// Connect to DB
const mongoose = mongoose()


//use
app.use('/',(req,res)=>{
    res.send("Hello World")
})
app.use(express.json())
app.use(cors())

// Listen
app.listen(port,() => {
	console.log("Server is running at ${port}")
})