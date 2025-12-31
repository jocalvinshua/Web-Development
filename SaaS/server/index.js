import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'

config()

const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

// route
app.get('/', (req, res) => {
    res.send('API is Working')
})

app.listen(port, () => {
    console.log(`Server is Running at http://localhost:${port}`)
})
