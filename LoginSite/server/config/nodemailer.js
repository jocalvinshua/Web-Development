import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const nodemailerConfig = {
  host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // SMTP username
        pass: process.env.SMTP_PASS // SMTP password
    },
    tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    }
};
const transporter = nodemailer.createTransport(nodemailerConfig);
export default transporter;