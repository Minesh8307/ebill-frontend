import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIgizGlyx4PKQDKm1ITBrDnYgn9fZnU-w",
  authDomain: "ebill-1e73a.firebaseapp.com",
  projectId: "ebill-1e73a",
  storageBucket: "ebill-1e73a.firebasestorage.app",
  messagingSenderId: "727485237469",
  appId: "1:727485237469:web:486044d1fb2996df91b334"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

