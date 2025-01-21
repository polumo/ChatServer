import type { Context } from 'hono'
import { FriendShip } from '@/models/FriendShip.ts'

const sendFriendRequest = async ({ req, get }: Context) => {
  const sucRes = get('successResponse')
  const errRes = get('errorResponse')
  try {
    const { friendId } = await req.json()

    const userId = get('userId')

    if (friendId === userId) {
      return errRes({ code: 400, message: '不能向自己发送好友请求' })
    }
    const existingRequest = await FriendShip.findOne({
      $or: [{ userId, friendId }, { userId: friendId, friendId: userId }],
    })

    if (existingRequest) {
      return errRes({ message: '好友请求已存在或已经是好友', code: 400 })
    }

    await FriendShip.create({
      userId,
      friendId,
      status: 'requested',
    })

    return sucRes({ message: '好友请求发送成功' })
  } catch {
    return errRes()
  }
}

const getFriendRequest = async ({ get }: Context) => {
  const sucRes = get('successResponse')
  const errRes = get('errorResponse')
  const userId = get('userId')

  try {
    const requestList = await FriendShip.find({ userId, status: 'requested' })

    return sucRes({ data: requestList })
  } catch {
    return errRes()
  }
}

const agreeFriendRequest = async ({ get, req }: Context) => {
  const sucRes = get('successResponse')
  const errRes = get('errorResponse')

  try {
    const { friendRequestId } = await req.json()

    if (!friendRequestId) {
      return errRes({ code: 400, message: 'Bad Request' })
    }

    const friendRequest = await FriendShip.findOneAndUpdate({ _id: friendRequestId }, { status: 'friend' })

    if (!friendRequest) {
      return errRes({ message: '未查询到该请求' })
    }

    return sucRes({ message: '添加成功' })
  } catch {
    return errRes()
  }
}

const rejectFriendRequest = async ({ get, req }: Context) => {
  const sucRes = get('successResponse')
  const errRes = get('errorResponse')

  try {
    const { friendRequestId } = await req.json()

    if (!friendRequestId) {
      return errRes({ code: 400, message: 'Bad Request' })
    }

    const friendRequest = await FriendShip.findByIdAndDelete(friendRequestId)

    if (!friendRequest) {
      return errRes({ message: '未查询到该请求' })
    }

    if (friendRequest.status !== 'requested') {
      return errRes({ message: '该请求非请求中' })
    }

    return sucRes({ message: '拒绝成功' })
  } catch {
    return errRes()
  }
}

export { sendFriendRequest, getFriendRequest, rejectFriendRequest, agreeFriendRequest }
