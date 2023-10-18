import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import userRoute from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js'
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middleware/errormiddleware.js'
import { connectToDatabase } from './config/db.js'
import path from 'path'

dotenv.config()

// Connect to the database
connectToDatabase()
  .then(() => {
    console.log('Connected to the database')
  })
  .catch((error) => {
    console.error('Database connection error:', error)
  })

const app = express()
const port = process.env.PORT || 3333

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Serve static files

app.use(express.static('backend/public'))

// Routes
app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
