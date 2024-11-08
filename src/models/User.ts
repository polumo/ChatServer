import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  nickname: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  avatarUrl: { type: String },
  status: {
    type: String,
    default: 'inactive',
    enum: ['inactive', 'active'],
  },
  lastLoginAt: { type: Date },
}, {
  timestamps: true,
  methods: {
    async verifyPassword(pwd: string) {
      try {
        return Bun.password.verify(pwd, this.password)
      } catch {
        throw new Error('密码验证失败')
      }
    },
  },
})

// Hash password with Bun
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    this.password = await Bun.password.hash(this.password, {
      algorithm: 'bcrypt',
      cost: 4,
    })
    next()
  } catch (error: any) {
    next(error)
  }
})

export const User = model('User', userSchema)
