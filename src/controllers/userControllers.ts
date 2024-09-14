import type { Context } from 'hono'
import { User } from '@/models/User.ts'
import { createErrorResponse, createResponse } from '@/utils/createResponse.ts'
import generateToken from '@/utils/generateToken.ts'

const loginUser = async ({ req, status, json }: Context) => {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      status(401)
      return json(createResponse({ code: 401, message: '邮箱或密码错误' }))
    }

    const user = await User.findOneAndUpdate({ email }, { lastLoginAt: new Date(), status: 1 })
    if (!user) {
      status(404)
      return json(createResponse({ code: 404, message: '邮箱不存在' }))
    }

    if (!user.verifyPassword(password)) {
      status(401)
      return json(createResponse({ code: 401, message: '密码错误' }))
    }

    const token = await generateToken(user._id.toString())
    status(200)
    return json(createResponse({ code: 200, data: token, message: '登录成功' }))
  } catch {
    status(500)
    return json(createErrorResponse())
  }
}

const registerUser = async ({ req, status, json }: Context) => {
  try {
    const { email, nickname, password } = await req.json()

    const exists = await User.findOne({ email })
    if (exists) {
      status(409)
      return json(createResponse({ code: 409, message: '该邮箱已被注册' }))
    }

    const newUser = await User.create({
      nickname,
      email,
      password,
      lastLoginAt: new Date(),
    })
    const token = await generateToken(newUser._id.toString())
    status(201)
    return json(createResponse({ code: 201, data: token, message: '注册成功，正在登录...' }))
  } catch {
    status(500)
    return json(createErrorResponse())
  }
}

const getUsers = async ({ status, json }: Context) => {
  try {
    const users = await User.find()
    return json(createResponse({ code: 200, data: users }))
  } catch {
    status(500)
    return json(createErrorResponse())
  }
}

export { loginUser, registerUser, getUsers }
