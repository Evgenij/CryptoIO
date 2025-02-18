const nodemailer = require("nodemailer");
const ApiError = require("../error/ApiError");

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
	}

	async sendActivationMail(to, link) {
		if (process.env.MAILER_IS_ACTIVE == true)
			try {
				await this.transporter.sendMail({
					from: process.env.SMTP_USER,
					to,
					subject: "Activation account for " + process.env.API_URL,
					text: "",
					html: `
					<div>
						<h1>For activation account, please click link</h1>
						<a href="${link}">${link}</a>
					</div>
				`,
				});
			} catch (e) {
				throw ApiError.badRequest("Message don't sent");
			}
	}
}

module.exports = new MailService();
