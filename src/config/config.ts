import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: process.env.PORT ?? '8000',
  AWS: {
    BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    PUBLIC_KEY: process.env.AWS_PUBLIC_KEY,
    SECRET_KEY: process.env.AWS_SECRET_KEY,
    BUCKET_REGION: process.env.AWS_BUCKET_REGION
  }
}
