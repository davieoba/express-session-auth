const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required']
  },
  email: {
    type: String,
    required: [true, 'A valid email address is required'],
    unique: true
  },
  googleId: String,
  password: {
    type: String
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  resetToken: {
    type: String
  },
  passwordResetExpire: {
    type: Date
  }
})

module.exports = mongoose.model('User', userSchema)
