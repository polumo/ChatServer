import { Hono } from 'hono'
import userRoutes from './userRoutes.ts'
import friendShipRoutes from './friendShipRoutes.ts'
import verifyToken from '@/middleware/verifyToken.ts'

const apiRoutes = new Hono().basePath('/api')

apiRoutes.route('/user', userRoutes)
apiRoutes.route('/friendShip', friendShipRoutes)

export default apiRoutes
