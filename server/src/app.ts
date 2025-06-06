import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import { connectDB } from './config/db'
import apiRoutes from './routes'
import { errorHandler, notFoundHandler } from './utils/error'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

connectDB()

app.use('/api/v1', apiRoutes)

app.use(notFoundHandler)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res)
})

export default app
