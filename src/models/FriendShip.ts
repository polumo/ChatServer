import { Schema, model } from 'mongoose'

const friendShipSchema = new Schema({
  userId: { type: String, required: true },
  friendId: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['requested', 'friend', 'blockedByUser', 'blockedByFriend'],
  },
}, {
  timestamps: true, // 自动管理 createdAt 和 updateAt
})

// 创建复合唯一索引，确保每对用户只有一条记录
friendShipSchema.index({ userId: 1, friendId: 1 }, { unique: true })

export const FriendShip = model('FriendShip', friendShipSchema)
