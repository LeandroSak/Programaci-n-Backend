import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import path from 'path'
import router from './src/routes/index.js'
import { fileURLToPath } from 'url';
import methodOverride from 'method-override'

import mongo from './database/mongoDB/config-mongo.js'
mongo();

//import firebase from './database/firebase/firebase.js'
//firebase();

const app = express()
import errorHandler from './src/middlewares/error.js'
//app.use(express.json())
//app.use(express.urlencoded({ extended: true }))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//app.use("/", express.static(__dirname + "/public"))
//app.use('/api', router)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', { methods: ["POST", "GET"] }))
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(errorHandler)

const getStoreConfig = () => {
    const MONGO_URI = "mongodb+srv://admin:P6aYPnp1M9HKCijQ@proyectoecommerce.tndeuz1.mongodb.net/session?retryWrites=true&w=majority";
    return {
        mongoUrl: MONGO_URI,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
};

import session from 'express-session'
import MongoStore from 'connect-mongo'


app.use(session({
    store: MongoStore.create(getStoreConfig()),
    secret: 'secreto',
    cookie: {
        maxAge: 10 * 60 * 1000
    },
    resave: true,
    saveUninitialized: true
}))

import transporter from './src/email/adminEmail.js'
const AdminEmail = process.env.ADMIN_EMAIL;
import passport from 'passport'
import local from 'passport-local'
const LocalStrategy = local.Strategy
import UserModel from './database/mongoDB/models/user.model.js'
import md5 from 'md5'

passport.use('login', new LocalStrategy(async (username, password, done) => {
    const userData = await UserModel.findOne({ username, password: md5(password) });
    if (!userData) {
        return done(null, false);
    }
    done(null, userData);
}));

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

app.use(passport.initialize());
app.use(passport.session());

app.use(router)
export default app