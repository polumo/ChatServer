import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import connectDB from './config/db.ts'
import apiRoutes from './routes/index.ts'
import { responseMiddleware } from './middleware/responseMiddleware.ts'

connectDB()

const app = new Hono()

app.use(cors(), prettyJSON(), responseMiddleware)

app.route('/', apiRoutes)

export default app
