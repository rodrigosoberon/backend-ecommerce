const UserDao = require('../models/daos/users.dao')
const HttpError = require('../utils/http-error')
const userDao = new UserDao()
const jwt = require('jsonwebtoken')
const { tokenConfig } = require('../config')
const sendMailTo = require('../utils/nodemailer')

class UsersService {
	async getUserByEmail(email, next) {
		let user
		try {
			user = await userDao.getByEmail(email)
			if (user) {
				return user
			}
		} catch (err) {
			console.log(err)
			return next(new HttpError('Process failed, please try again later.', 500))
		}
	}

	async createUser(user, next) {
		try {
			await userDao.save(user)
		} catch (err) {
			return next(new HttpError('Signing up failed, please try again later', 500))
		}

		try {
			sendMailTo(
				process.env.NODEMAILER_SEND_REGISTERS_TO,
				'New user registered',
				`New user registered: ${user.email}`
			)
		} catch (err) {}

		return user
	}

	async createToken(user, next) {
		let token
		try {
			token = jwt.sign({ userId: user._id, email: user.email }, tokenConfig.JWT_KEY, {
				expiresIn: tokenConfig.expiration
			})
		} catch (err) {
			console.log(err)
			return next(new HttpError('Loggin in failed, please try again later', 500))
		}
		return token
	}
}

module.exports = UsersService
