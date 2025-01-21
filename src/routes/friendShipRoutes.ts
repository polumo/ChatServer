import { Hono } from 'hono'
import { agreeFriendRequest, getFriendRequest, sendFriendRequest } from '@/controllers/friendShipController.ts'
import verifyToken from '@/middleware/verifyToken.ts'

const friendShipRoutes = new Hono()

friendShipRoutes.post('/send', verifyToken, sendFriendRequest)
friendShipRoutes.post('/agree', agreeFriendRequest)
friendShipRoutes.get('/friendRequest', verifyToken, getFriendRequest)

export default friendShipRoutes
