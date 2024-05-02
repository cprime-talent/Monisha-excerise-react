import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv6JjbUC03hE2WvSK7kz3tresb18iR5Zc",
  authDomain: "curdoperationassements.firebaseapp.com",
  projectId: "curdoperationassements",
  storageBucket: "curdoperationassements.appspot.com",
  messagingSenderId: "846120078537",
  appId: "1:846120078537:web:49f625d587a45166811118"
};


// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);