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

export { sendFriendRequest }
