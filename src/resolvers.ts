import models from './app/models'
import jwt from 'jsonwebtoken'
import authConfig from './config/auth.json'
import bcrypt from 'bcryptjs'

function generateToken (params = {}): string {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

export default {
  Query: {
    users: () => { return models.User.findAll() },
    user: (_, { id }) => { return models.User.findOne({ where: { id: id } }) }
  },

  Mutation: {
    createUser: (_, { name, email, password }) => {
      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      return models.User.create({
        name,
        email,
        password: hash
      })
    }
  }
}
