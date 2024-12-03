import { Hono } from 'hono'
import { sendFriendRequest } from '@/controllers/friendShipController.ts'
import verifyToken from '@/middleware/verifyToken.ts'

const friendShipRoutes = new Hono()

friendShipRoutes.post('/sendFriendRequest', verifyToken, sendFriendRequest)

export default friendShipRoutes
