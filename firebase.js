import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzrQIcoMLKPVrzyjwsb2YWb4FX8qQIpaM",
  authDomain: "clone-7d5ee.firebaseapp.com",
  projectId: "clone-7d5ee",
  storageBucket: "clone-7d5ee.appspot.com",
  messagingSenderId: "893570463996",
  appId: "1:893570463996:web:73ce4ea72daa5a2f86bf79",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();
