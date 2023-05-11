import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA0xrtiFzNhMMLJPfmeTx7FCFeo7QSigE0",
  authDomain: "miniblog-ff36c.firebaseapp.com",
  projectId: "miniblog-ff36c",
  storageBucket: "miniblog-ff36c.appspot.com",
  messagingSenderId: "422455984951",
  appId: "1:422455984951:web:35f54f76b2486fd7e6d0b2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }