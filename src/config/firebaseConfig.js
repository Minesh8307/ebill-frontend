import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXghrr3ORDBParyAmHXLckmYxdrRDAVAI",
  authDomain: "ebill-3a434.firebaseapp.com",
  projectId: "ebill-3a434",
  storageBucket: "ebill-3a434.appspot.com",
  messagingSenderId: "680611220311",
  appId: "1:680611220311:web:0bd47fb6e0081e83bb4c12"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

