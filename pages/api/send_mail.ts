import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

async function sendEmail(req: any, res: any) {
    const { subject, fullName, email, message } = req.body;
    try {
        await sendgrid.send({
            to: 'destek@geoport.com.tr', // Your email where you'll receive emails
            from: 'destek@soilprime.com', // your website email address here
            subject: `${subject}`,
            html: `<div>
            <h1>Yeni bir mesajınız var!</h1>
            <p>Ad Soyad: ${fullName}</p>
            <p>Email: ${email}</p>
            <p>Mesaj: ${message}</p>
            </div>`,
        });
    } catch (error) {
        return { error: 'Something went wrong', status: 500 };
    }

    return res.status(200).json({ error: '' });
}

export default sendEmail;
