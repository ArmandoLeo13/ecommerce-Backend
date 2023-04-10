import { createTransport } from "nodemailer";

export async function mail (subject, data){
    const transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
    });
      const options = {
        from: process.env.EMAIL_USER,
        to : process.env.EMAIL_TO,
        subject: subject,
        html: `<div>${data}</div>`
      }

    transporter.sendMail(options);
}






