import { Hono } from 'hono'
import { getUsers, loginUser, registerUser, searchUser } from '@/controllers/userControllers.ts'

const userRoutes = new Hono()

userRoutes.post('/login', loginUser)
userRoutes.post('/register', registerUser)
userRoutes.get('/all', getUsers)
userRoutes.post('/search', searchUser)

export default userRoutes
