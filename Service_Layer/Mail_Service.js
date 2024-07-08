const nodemailer = require('nodemailer');
async function SendMail(req) {
    // const { to, subject, text } = req.body;
    const { full_name,e_mail, message} = req.body;
    // const to = 'nithesh.codeflink@gmail.com';
    // subject = 'Test for hosting';
    // text = 'Hello world?';
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'terionorganization@gmail.com',
            pass: 'imkq rydg xtla lvmx' // Replace with your email password or an app-specific password
        }
    });
    let mailOptions = {
        from: 'terionorganization@gmail.com', // Sender address
        to: e_mail, // List of recipients
        subject: `Hello ${full_name}`, // Subject line
        html: `<div><p>Your Response: <b>${message}</b>  - is taken into our consideration. Thanks for your feedback.</p></div>`
        // text: <div><h2> Hello `${full_name}`</h2><p>Your Response : `${message}` : Is taken to our Consideration . Thanks for your feedback</p> </div>
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