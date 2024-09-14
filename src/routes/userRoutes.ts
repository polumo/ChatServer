import { Hono } from 'hono'
import { user } from 'src/controllers/index.ts'

const userRoutes = new Hono()

userRoutes.post('/login', user.loginUser)
userRoutes.post('/register', user.registerUser)
userRoutes.get('/all', user.getUsers)

export default userRoutes
