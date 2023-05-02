import transporter from '../email/adminEmail.js'
const AdminEmail = process.env.ADMIN_EMAIL;
import passport from 'passport'
import local from 'passport-local'
const LocalStrategy = local.Strategy
import UserModel from '../../database/mongoDB/models/user.model.js'
import md5 from 'md5'

const initPassport =()=>{
passport.use('login', new LocalStrategy(async (username, password, done) => {
    const userData = await UserModel.findOne({ username, password: md5(password) });
    if (!userData) {
        return done(null, false);
    }
    done(null, userData);
}));
}

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    const userData = await UserModel.findOne({ username });
    if (userData) {
        return done(null, false);
    }
    const stageUser = new UserModel({
        username,
        password: md5(password),
        name: req.body.name,
        age: req.body.age,
        adress: req.body.adress,
        phone: req.body.ibxCode,
        clase: "cliente"
    });
    const mailOptions = {
        from: 'Servidor Node.js',
        to: AdminEmail,
        subject: 'Nuevo Registro',
        html: `<h1>Nuevo registro</h1><br><ul><li>Nombre: ${req.body.name}</li><li>Email: ${username}</li><li>age: ${req.body.age}</li><li>Direccion: ${req.body.adress}</li><li>Telefono: ${req.body.ibxCode}</li>`
    };
    const newUser = await stageUser.save();
    await transporter.sendMail(mailOptions);
    done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const userData = await UserModel.findById(id);
    done(null, userData);
});

export default initPassport