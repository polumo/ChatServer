import { Jwt } from 'hono/utils/jwt'

const generateToken = (userId: string): Promise<string> => {
  return Jwt.sign({ id: userId }, Bun.env.JWT_SECRET)
}

export default generateToken
