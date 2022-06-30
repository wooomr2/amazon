import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import * as admin from "firebase-admin";

const firebaseConfig = {
  apiKey:  process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();


export const firebasePermission = {
  "type": "service_account",
  "project_id": process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  "private_key_id": process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
  "private_key": process.env.NEXT_PUBLIC_PRIVATE_KEY,
  "client_email": process.env.NEXT_PUBLIC_CLIENT_EMAIL,
  "client_id": process.env.NEXT_PUBLIC_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xlmmg%40clone-7d5ee.iam.gserviceaccount.com"
}

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(firebasePermission),
    })
  : admin.app();