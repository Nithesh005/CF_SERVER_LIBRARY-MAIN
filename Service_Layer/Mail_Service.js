const nodemailer = require('nodemailer');
async function SendMail(req) {
    // const { to, subject, text } = req.body;
    const to = 'nithesh.codeflink@gmail.com';
    subject = 'Test for hosting';
    text = 'Hello world?';
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'terionorganization@gmail.com',
            pass: 'imkq rydg xtla lvmx' // Replace with your email password or an app-specific password
        }
    });
    let mailOptions = {
        from: 'terionorganization@gmail.com', // Sender address
        to: to, // List of recipients
        subject: subject, // Subject line
        text: text // Plain text body
    };
    try {
        console.log('Sending Mail ....');
        await transporter.sendMail(mailOptions);
        console.log('Send Success!');
        return ({ sts: true, msg: 'Mail Send Successfully' });
    } catch (error) {
        console.error(error);
        return ({ sts: false, msg: 'Failed to send email' });
    }
}

module.exports = { SendMail };