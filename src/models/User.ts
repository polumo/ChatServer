import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String },
  status: { type: Number, default: 0 },
  createAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date },
}, {
  methods: {
    verifyPassword(pwd: string) {
      return Bun.password.verifySync(pwd, this.password)
    },
  },
})

// Hash password with Bun
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await Bun.password.hash(this.password, {
    algorithm: 'bcrypt',
    cost: 4,
  })
})

export const User = model('User', userSchema)
