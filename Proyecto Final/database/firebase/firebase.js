
import admin from "firebase-admin"
import serviceAccount from "./proyectoEcommerceKeys.json" assert { type: "json" }
import logger from '../../src/logger/logger.js'



const connectionFirebase = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  logger.log("info", "conectado a firebase");
}


export default connectionFirebase
