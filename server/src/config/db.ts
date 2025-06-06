import mongoose from 'mongoose'
import { envConfig } from './env'

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(envConfig.mongo.url, {
      serverSelectionTimeoutMS: 5000, 
    })
    await mongoose.connection.db?.admin().ping()
    console.log('Connection is stable!')
  } catch (err) {
    console.error('MongoDB Connection Error:', err)
    process.exit(1)
  }
}

export const disconnectDB = async (): Promise<void> => {
  await mongoose.connection.close()
  console.log('MongoDB Disconnected...')
}
