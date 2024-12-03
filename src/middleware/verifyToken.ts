import type { Context, Next } from 'hono'
import { Jwt } from 'hono/utils/jwt'

const verifyToken = async ({ req, get, set }: Context, next: Next) => {
  const errRes = get('errorResponse')
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    return errRes({ code: 401, message: 'Invalid token' })
  }

  try {
    const decode = await Jwt.verify(token, Bun.env.JWT_SECRET)
    set('userId', decode?.id as string)
    return next()
  } catch {
    return errRes({ code: 401, message: 'Invalid token' })
  }
}

export default verifyToken
