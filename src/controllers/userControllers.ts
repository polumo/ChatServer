import type { Context } from 'hono'
import { User } from '@/models/User.ts'
import generateToken from '@/utils/generateToken.ts'

const loginUser = async ({ req, get }: Context) => {
  const successResponse = get('successResponse')
  const errorResponse = get('errorResponse')
  try {
    const { email, password } = await req.json()

    const user = await User.findOneAndUpdate({ email }, {
      lastLoginAt: new Date(),
      status: 'active',
    })
    if (!user) {
      return errorResponse({ message: '邮箱不存在', code: 404 })
    }

    if (!password) {
      return errorResponse({ message: '邮箱或密码错误', code: 401 })
    }

    if (!(await user.verifyPassword(password))) {
      return errorResponse({ message: '密码错误', code: 401 })
    }

    const token = await generateToken(user._id.toString())
    return successResponse({ data: token, message: '登录成功', code: 200 })
  } catch {
    return errorResponse()
  }
}

const registerUser = async ({ req, get }: Context) => {
  const successResponse = get('successResponse')
  const errorResponse = get('errorResponse')
  try {
    const { email, nickname, password } = await req.json()

    const exists = await User.findOne({ email })
    if (exists) {
      return errorResponse({ code: 409, message: '该邮箱已被注册' })
    }

    const newUser = await User.create({
      nickname,
      email,
      password,
      lastLoginAt: new Date(),
    })
    const token = await generateToken(newUser._id.toString())
    return successResponse({ code: 201, data: token, message: '注册成功' })
  } catch {
    return errorResponse()
  }
}

const getUsers = async ({ get }: Context) => {
  const successResponse = get('successResponse')
  const errorResponse = get('errorResponse')
  try {
    const users = await User.find()
    return successResponse({ code: 200, data: users })
  } catch {
    return errorResponse()
  }
}

const searchUser = async ({ req, get }: Context) => {
  const successResponse = get('successResponse')
  const errorResponse = get('errorResponse')
  try {
    const { searchValue } = await req.json()
    const users = await User.find({
      $or: [
        { nickname: { $regex: searchValue, $options: 'i' } },
        { email: { $regex: searchValue, $options: 'i' } },
      ],
    }, 'nickname email') // 只返回 nickname email 字段
    return successResponse({ code: 200, data: users })
  } catch {
    return errorResponse()
  }
}

export { getUsers, loginUser, registerUser, searchUser }
