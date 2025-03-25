import nodemailer from "nodemailer";
import configsEnv from "@/configs/configs.env";

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            secure: true,
            service: "gmail",
            auth: {
                user: configsEnv.ADMIN_EMAIL,
                pass: configsEnv.MAIL_APP_PASSWORD,
            },
        });
    }


    async sendEmail(
        from: string,
        to: string,
        subject: string,
        html: string,
        replyTo: string
    ): Promise<void> {
        const mailOptions = { from, to, subject, html, replyTo };
        await this.transporter.sendMail(mailOptions);
    }
}

export default new EmailService();