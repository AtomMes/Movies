import dotenv from 'dotenv'

dotenv.config()

export const envConfig = {
  mongo: {
    url: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
  },
  tmdb: {
    apiKey: process.env.TMDB_API_KEY || '',
  },
  jwt_secret: process.env.JWT_SECRET || '',
  port: parseInt(process.env.PORT || '3000', 10),
}
