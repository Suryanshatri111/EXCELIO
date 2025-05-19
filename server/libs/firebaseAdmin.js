import admin from "firebase-admin";
// import serviceAccount from "./firebaseServiceAccount.json" assert { type: "json" };
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("./firebaseServiceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
