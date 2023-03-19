import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZJa_V_W71iMku0tWkgf_svMEg2hvE-Xc",
  authDomain: "jobberbwapp.firebaseapp.com",
  projectId: "jobberbwapp",
  storageBucket: "jobberbwapp.appspot.com",
  messagingSenderId: "514136605184",
  appId: "1:514136605184:web:953788d1da624b2e8b8ee5",
  measurementId: "G-JTFP71Z7Z1"
};

/* Initialize Firebase

if (!getApps().length) {
  initializeApp(firebaseConfig);
}  
*/
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);