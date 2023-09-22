import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgH03OTXlW5ssom73Bv0S2y4Q2RrtyDG0",
  authDomain: "podcast-app-react-6b325.firebaseapp.com",
  projectId: "podcast-app-react-6b325",
  storageBucket: "podcast-app-react-6b325.appspot.com",
  messagingSenderId: "636621028400",
  appId: "1:636621028400:web:1229e9a06d39c4374c41f5",
  measurementId: "G-E583347GLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {auth,db,storage};