import { connect } from 'mongoose'

const connectDB = async () => {
  try {
    if (Bun.env.MONGODB_URI !== undefined) {
      const conn = await connect(Bun.env.MONGODB_URI)
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
  } catch (err: any) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

export default connectDB
