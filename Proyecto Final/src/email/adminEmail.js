import { createTransport } from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const AdminEmail = process.env.ADMIN_EMAIL;
const AdminPass = process.env.ADMIN_EMAIL_PASS;
const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: AdminEmail,
        pass: AdminPass

    }
});

export default transporter;