import nodemailer from 'nodemailer';


const sendEmail = async (option) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            email_port : process.env.email_PORT,
            secure: true,
            auth : {
                user: process.env.SMTP_USER, // a@a.com
                pass: process.env.SMTP_PASS // fthgdvsdvsvh
            }
        })
        const info = await transporter.sendMail(option);

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        throw new Error(error.message)
    }
}

export {
    sendEmail
}