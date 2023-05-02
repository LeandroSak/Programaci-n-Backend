import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import path from 'path'
import router from './src/routes/index.js'
import { fileURLToPath } from 'url';
import methodOverride from 'method-override'

import mongo from './database/mongoDB/config-mongo.js'
mongo();

import firebase from './database/firebase/firebase.js'
firebase();

const app = express()
import errorHandler from './src/middlewares/error.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', { methods: ["POST", "GET"] }))
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(errorHandler)

const getStoreConfig = () => {
    const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.DB_SESSION}?${process.env.MONGO_QUERY}`;
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

import passport from 'passport'
import initPassport from './src/passport/passport.js'

initPassport();

app.use(passport.initialize());
app.use(passport.session());

app.use(router)
export default app