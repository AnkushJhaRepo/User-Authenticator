import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

interface SendEmailParams {
    email: string;
    emailType: 'VERIFY' | 'RESET';
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }


        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        });

        const mailOptions = {
            from: 'jhaankush65@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? `verifyemail?token=${hashedToken}` : `resetPassword?token=${hashedToken}`}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. 
            <br> 
            ${process.env.DOMAIN}/${emailType === "VERIFY" ? `verifyemail?token=${hashedToken}` : `resetPassword?token=${hashedToken}`}
            </p>`

        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Unknown error occurred while sending email.");
        }
    }
}