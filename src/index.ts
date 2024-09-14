import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import connectDB from './config/db.ts'
import apiRoutes from './routes/index.ts'

connectDB()

const app = new Hono()

app.use(cors(), prettyJSON())

app.route('/', apiRoutes)

export default app
