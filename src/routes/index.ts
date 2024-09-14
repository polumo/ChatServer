import { Hono } from 'hono'
import userRoutes from './userRoutes.ts'

const apiRoutes = new Hono().basePath('/api')

apiRoutes.route('/user', userRoutes)

export default apiRoutes
