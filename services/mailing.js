const nodemailer = require('nodemailer');;

module.exports = sendMail = (email, msg) => {
    console.log('Sending Mail...');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    let mailOptions = {
        from: 'nikabot61@gmail.com',
        to: email,
        subject: 'Password Reset',
        html : msg
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if(!err) return console.log('Mail Sent');
    });
}