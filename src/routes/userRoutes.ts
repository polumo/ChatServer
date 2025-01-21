import { Hono } from 'hono'
import { getFriends, getUsers, loginUser, registerUser, searchUser } from '@/controllers/userControllers.ts'
import verifyToken from '@/middleware/verifyToken.ts'

const userRoutes = new Hono()

userRoutes.post('/login', loginUser)
userRoutes.post('/register', registerUser)
userRoutes.get('/all', getUsers)
userRoutes.post('/search', searchUser)
userRoutes.get('/friends', verifyToken, getFriends)

export default userRoutes
