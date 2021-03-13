const nodemailer = require('nodemailer');;

module.exports = sendMail = (email, msg) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset',
        html : msg
    }
    transporter.sendMail(mailOptions);
}