import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Configure nodemailer transporter (use your SMTP server configuration here)
    this.transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
      service: 'outlook',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Function to send the email with an attachment
  async sendEmail(
    to: string,
    subject: string,
    text: string,
    attachmentPath: string,
    filename: string,
  ) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to, // Receiver email (from API payload)
      subject, // Subject of the email
      text, // Body of the email
      attachments: [
        {
          filename: filename,
          path: attachmentPath, // Path to the generated Excel file
        },
      ],
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
