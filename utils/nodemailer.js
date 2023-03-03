const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASS
	}
})

const sendMailTo = async (to, subject, text) => {
	const mailOptions = {
		from: process.env.NODEMAILER_FROM || 'Ecommerce team',
		to,
		subject,
		text
	}
	return await transporter.sendMail(mailOptions)
}

module.exports = sendMailTo
