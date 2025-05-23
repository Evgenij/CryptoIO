const nodemailer = require("nodemailer");

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
		try {
			if (process.env.MAILER_IS_ACTIVE === true) {
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
			} else {
				console.log("Mailer is off");
			}
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new MailService();
