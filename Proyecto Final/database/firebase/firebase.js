
import admin from "firebase-admin"
import serviceAccount from "./proyectoEcommerceKeys.json" assert { type: "json" }



const connectionFirebase = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.info("Conectado a Firebase") 
}


export default connectionFirebase
