import dotenv from 'dotenv'
dotenv.config()
import express  from 'express'
import path from 'path'
import router from './src/routes/index.js'
import {fileURLToPath} from 'url';

import mongo from './database/mongoDB/config-mongo.js'
mongo();

import firebase from './database/firebase/firebase.js'
firebase();

const app = express()
import  errorHandler from './src/middlewares/error.js'
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/", express.static(__dirname + "/public"))
app.use('/api', router)
app.use(errorHandler)


export default app