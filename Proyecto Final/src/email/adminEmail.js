import { createTransport } from 'nodemailer'
const AdminEmail = process.env.ADMIN_EMAIL;
const AdminPass = process.env.ADMIN_EMAIL_PASS;
const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: 'sanchezk.descargas@gmail.com',
        pass: 'sgekljjcqchlrral'

    }
});

export default transporter;